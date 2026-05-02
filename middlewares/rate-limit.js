const rateLimitStore = {};
import dotenv from "dotenv";

dotenv.config();

const RATE_LIMIT = Number(process.env.RATE_LIMIT);
const WINDOW_PERIOD = Number(process.env.WINDOW_PERIOD);

const rate_limiter = (req, res, next) => {
    const ip = req.ip;
    const current_time = Date.now();

    if (!rateLimitStore[ip]) {
        rateLimitStore[ip] = {
            req_at: [current_time]
        };
    } else {

        rateLimitStore[ip].req_at = rateLimitStore[ip].req_at.filter(
            t => t > current_time - WINDOW_PERIOD
        );

        if (rateLimitStore[ip].req_at.length >= RATE_LIMIT) {

            const oldest = rateLimitStore[ip].req_at[0];
            const expiresAt = oldest + WINDOW_PERIOD;
            const retryAfterSec = Math.max(
                0,
                Math.ceil((expiresAt - current_time) / 1000)
            );

            res.setHeader("Retry-After", retryAfterSec);

            return res.status(429).json({
                error: "Too many requests",
                retryAfter: retryAfterSec
            });
        }

        rateLimitStore[ip].req_at.push(current_time);
    }

    res.setHeader("X-RateLimit-Limit", RATE_LIMIT);
    res.setHeader(
        "X-RateLimit-Remaining",
        Math.max(0, RATE_LIMIT - rateLimitStore[ip].req_at.length)
    );

    next();
};

export default rate_limiter;