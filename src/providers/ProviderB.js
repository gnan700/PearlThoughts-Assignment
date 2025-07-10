let failureToggleB = false;

class ProviderB{
    constructor(){
        this.name = "ProviderB"; 
    }

    async sendEmail(email){
        if(failureToggleB){
            throw new Error("ProviderB is failed...");
        }
        console.log(`[ProviderB] Email sent to ${email.to}`);
    }
}

module.exports = ProviderB;