import express from "express"

const router = express.Router()

router.get("/",(req,res)=>{
    res.render("index")
})
router.get("/main",(req,res)=>{
    res.render("main")
})
router.get("/profile",(req,res)=>{
    res.render("friends_profile", {active: "profile"})
})
router.get("/friends_profile_comment",(req,res)=>{
    res.render("friends_profile_comment",{active: "profile"})
})
router.get("/friends",(req,res)=>{
    res.render("friends_in_menu")
})
router.get("/add_profile_info",(req,res)=>{
    res.render("main_add_profile_info")
})
router.get("/edit_profile",(req,res)=>{
    res.render("main_edit_profile_info")
})
router.get("/my_messages",(req,res)=>{
    res.render("my_messages")
})
router.get("/profile_filled",(req,res)=>{
    res.render("profile_filled")
})
router.get("/profile_friends",(req,res)=>{
    res.render("profile_friends")
})
router.get("/profile_gallery",(req,res)=>{
    res.render("profile_gallery")
})
router.get("/profile_info",(req,res)=>{
    res.render("profile_info", {active: "info"})
})
router.get("/profile_new_post",(req,res)=>{
    res.render("profile_new_post")
})
router.get("/profile_notifications",(req,res)=>{
    res.render("profile_notifications")
})
router.get("/profile_projects",(req,res)=>{
    res.render("profile_projects")
})
export default router