import express from 'express'
import Doctor from '../models/DoctorModel.js'
import { fetchDocs, getDoctor, addDoctor, deleteDoctor } from '../controllers/doctorController.js';
import multer from 'multer'
import path from 'path'
import upload from '../config/multerConfig.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , "uploads/");
    },
    filename : (req , file , cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({storage});

router.get("/" , fetchDocs);
router.get("/:id" , getDoctor);
router.post("/doctors", upload.single("image"), addDoctor);
router.delete("/:id" , deleteDoctor);

export default router;
