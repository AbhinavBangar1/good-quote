const rateLimitStore = {} // Change this shit with redis later on
const RATE_LIMIT = Number(process.env.RATE_LIMIT) ; // Per minute
const WINDOW_PERIOD = Number(process.env.WINDOW_PERIOD) ;


const rate_limiter = (req , res , next) => {
    const ip = req.ip ;
    const current_time = Date.now() ;
    if (!rateLimitStore[ip]) {
        rateLimitStore[ip] = {
            req_at : [Date.now()]
        }
    }
    else{
        if (rateLimitStore[ip].req_at.length > RATE_LIMIT){
            return res.status(429).json({error : "Too many requests"}) ;
        }
        else{
            rateLimitStore[ip].req_at.push(current_time)
        }
        while (rateLimitStore[ip].req_at.length && rateLimitStore[ip].req_at[0] <= current_time - WINDOW_PERIOD) {
            rateLimitStore[ip].req_at.shift();
            if(rateLimitStore[ip].req_at.length === 0)
                delete rateLimitStore[ip] ;
        }
    }
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT);
    res.setHeader('X-RateLimit-Remaining', RATE_LIMIT - rateLimitStore[ip].req_at.length);
    next();
}

export default rate_limiter ;