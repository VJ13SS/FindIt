import multer from "multer";

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) => {
        //cb -> callback function
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage})

export default upload