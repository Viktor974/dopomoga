import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import UserRoutes from "./route/users.js"
import PostsRoutes from "./route/posts.js"
import AuthRoutes from "./route/auth.js"

const app = express()

app.use(express.json())
app.use(express.json({limit:"100mb"}))
app.use(morgan("tiny"))
app.use(cors())
app.use(cookieParser())
dotenv.config()
app.use("/public/uploads", express.static("public/uploads"))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", true)
    next()
})

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error", err))

const baseURL = "/api"

app.use(`${baseURL}/users`, UserRoutes)
app.use(`${baseURL}/posts`, PostsRoutes)
app.use(`${baseURL}/auth`, AuthRoutes)

const Port = process.env.PORT

app.listen(Port,()=>{
    console.log(`Server start \nPort:${Port}`)
})