let failureToggleA = false;

class ProviderA{
    constructor(){
        this.name = "ProviderA"; 
    }

    async sendEmail(email){
        if(failureToggleA){
            throw new Error("ProviderA is failed...");
        }
        console.log(`[ProviderA] Email sent to ${email.to}`);
    }
}

module.exports = ProviderA;