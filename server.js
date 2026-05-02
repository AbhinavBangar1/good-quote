import express from 'express';
import cors from 'cors' ;
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import rate_limiter from './middlewares/rate-limit.js';
import randomQuotes from './routes/random.js' ;
import characterQuotes from './routes/character.js' ;
import sourceQuotes from './routes/source.js' ;
import categoryQuotes from './routes/category.js' ;
import Qotd from './routes/quoteOfTheDay.js' ;

const app = express() ;

app.use(morgan('dev')) ; // this of logging
app.use(helmet()) ; // this for security :))
app.use(cors());
app.use(express.json());
app.use(rate_limiter) ;

app.get('/' , async(req,res) => {
    res.send('Server Running');
})

app.use('/api/v1/random' , rate_limiter , randomQuotes);
app.use('/api/v1/character' , rate_limiter , characterQuotes);
app.use('/api/v1/source' , rate_limiter , sourceQuotes);
app.use('/api/v1/category' , rate_limiter , categoryQuotes);
app.use('/api/v1/qotd' , rate_limiter , Qotd) ;

app.listen(process.env.PORT , () => {
    console.log(`server running at http://localhost:${process.env.PORT}`) ;
})