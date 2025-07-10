class RateLimiter{
    constructor(limit, interval = 60000){
        this.limit = limit;
        this.interval = interval;
        this.lastRefill = Date.now();
        this.tokens = limit;
    }

    allow(){
        const curr = Date.now();
        const timeGap = curr - this.lastRefill;
        if(timeGap > this.interval){
            this.tokens = this.limit;
            this.lastRefill = curr;
        }
        if(this.tokens > 0){
            this.tokens--;
            return true;
        }
        return false;
    }
}

module.exports = RateLimiter;