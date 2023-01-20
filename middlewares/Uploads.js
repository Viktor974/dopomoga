import multer from 'multer';

const types = {
    "image/png" : "png",
    "image/jpeg" : "jpeg",
    "image/jpg" : "jpg"
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = types[file.mimetype];
        let uploadError = new Error("invalid Image Type");
        if(isValid) uploadError = null
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ' , '-');
        cb(null, new Date().toISOString() + '-' + fileName);
    }
})
export default multer({ storage });
