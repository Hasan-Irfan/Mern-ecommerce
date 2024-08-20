import connectDB from './src/db/index.js'
import dotenv from 'dotenv';
import { app } from './src/app.js';

dotenv.config({
  path: '.env'
});

connectDB().then(
  app.listen(process.env.PORT || 8000 , () => {
    console.log(`Example app listening on port ${process.env.PORT || 8000}`)
  })
).catch((error)=>{
  console.error("MONGO Connection ERROR", error);
});


