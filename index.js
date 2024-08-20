import connectDB from './src/db/index.js'
import dotenv from 'dotenv';
import { app } from './src/app.js';

dotenv.config({
  path: '.env'
});

const port = 4000;

connectDB().then(
  app.listen(process.env.PORT || port , () => {
    console.log(`Example app listening on port ${process.env.PORT || port}`)
  })
).catch((error)=>{
  console.error("MONGO Connection ERROR", error);
});


