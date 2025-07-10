class Retry{
    static async exponentialBackoff(fun, retries = 3, delay = 1000){
        for (let retry = 0; retry < retries; retry++){
            try {
                return await fun();
            } catch (error) {
                if(retry == retries - 1) throw error;
                await new Promise(res => setTimeout(res, delay * Math.pow(2, retry)));
            }
        }
    }
}

module.exports = Retry;