import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'doctors',
        allowed_formats : ['jpg', 'png', 'jpeg'],
    },
});


const upload = multer({ storage });

export default upload;
