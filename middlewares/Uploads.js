import multer from 'multer';

const FILE_TYPE_MAP = {
    "image/png" : "png",
    "image/jpeg" : "jpeg",
    "image/jpg" : "jpg"
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid Image Type");
        if(isValid) uploadError = null
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(' ' , '-');
        const extention = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extention}`);
    }
})
export default multer({ storage: storage });
