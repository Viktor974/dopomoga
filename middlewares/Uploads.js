import multer from 'multer';
import moment from 'moment'
const FILE_TYPE_MAP = {
    "image/png" : "png",
    "image/jpeg" : "jpeg",
    "image/jpg" : "jpg"
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`);
    }
})
const fileFilter = (req, file, cb)=>{
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}
const limits = {
    fileSize: 1024 * 1024 * 5
}
export default multer({ storage,fileFilter,limits });

// {
//     "fullName": "viktor",
//     "login": "viktor",
//     "email": "yxc123@gmail.com",
//     "password": "1234678"
//
// }
