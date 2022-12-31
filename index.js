import express from "express"
import UserRoutes from "./route/users.js"
import PostsRoutes from "./route/posts.js"
import AuthRoutes from "./route/auth.js"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

const app = express()
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", true)
    next()
})

app.use(express.json())
app.use(cors({
    origin:"http:localhost:3000"
}))
app.use(cookieParser())
dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error", err))

const baseURL = "/api/"

app.use(`${baseURL}/users`, UserRoutes)
app.use(`${baseURL}/posts`, PostsRoutes)
app.use(`${baseURL}/auth`, AuthRoutes)

const Port = process.env.PORT

app.listen(Port,()=>{
    console.log(`Server start \nPort:${Port}`)
})