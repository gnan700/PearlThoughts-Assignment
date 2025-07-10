class Email{
    constructor(id, to, subject, body){
        this.id = id;
        this.to = to;
        this.subject = subject;
        this.body = body;
    }
}

module.exports = { Email };