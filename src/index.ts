import express from "express"
import morgan  from "morgan"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

const app =express();
 app.use(express.json())
 app.use(cookieParser())
 app.use(morgan("dev"))

 app.get("/", (req, res)=>{
    res.send('<h1> typeorm을 사용해보자 </h1>')
 })

 app.listen(process.env.PORT,()=>{
    
 })
