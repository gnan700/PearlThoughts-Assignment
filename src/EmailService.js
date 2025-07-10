const Retry = require("./features/Retry");
const RateLimiter = require("./features/RateLimiter");

class EmailService{
    constructor(providers, rateLimit = 20){
        this.providers = providers;
        this.rateLimiter = new RateLimiter(rateLimit);
        this.sentEmailIds = new Set();
        this.statusMap = new Map();
    }

    log(message){
        console.log(`[EmailService] ${message}`);
    }

    getStatus(emailId){
        return this.statusMap.get(emailId) || "unknown";
    }

    async send(email){
        if(!this.rateLimiter.allow()){
            throw new Error("Rate limit exceeded");
        }

        if(this.sentEmailIds.has(email.id)){
            this.log(`Duplicate email : ${email.id}`);
            return;
        }

        for(const provider of this.providers){
            try {
                await Retry.exponentialBackoff(() => provider.sendEmail(email));
                this.sentEmailIds.add(email.id);
                this.statusMap.set(email.id, "sent");
                return;
            } catch (error) {
                this.log(`${provider.name} failed, trying next.`);
            }
        }

        this.statusMap.set(email.id, "failed");
        throw new Error("All providers failed");
    }
}

module.exports = EmailService;