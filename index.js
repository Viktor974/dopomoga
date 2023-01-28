import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import UserRoutes from "./route/users.js"
import PostsRoutes from "./route/posts.js"
import AuthRoutes from "./route/auth.js"
import OrganizationRoutes from "./route/organizations.js"
import route from "./route/pages.js"

const app = express()

app.use(express.json())
app.use(express.json({limit:"100mb"}))
app.use(express.static('public'))
app.use(morgan("tiny"))
app.use(cors())
app.set('view engine', 'ejs');
app.use(cookieParser())
dotenv.config()
app.use("/public", express.static("public"))

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error", err))

const baseURL = "/api"

app.use(route)
app.use(`${baseURL}/users`, UserRoutes)
app.use(`${baseURL}/posts`, PostsRoutes)
app.use(`${baseURL}/auth`, AuthRoutes)
app.use(`${baseURL}/organization`, OrganizationRoutes)

const Port = process.env.PORT

app.listen(Port,()=>{
    console.log(`Server start \nPort:${Port}`)
})