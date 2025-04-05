import express from 'express';
import Doctor from '../models/DoctorModel.js';
import { fetchDocs, getDoctor, addDoctor } from '../controllers/doctorController.js';
import multer from 'multer';
import path from 'path';
import upload from '../config/multerConfig.js'; // Use the imported upload

const router = express.Router();

router.get("/", fetchDocs);
router.get("/:id", getDoctor);
router.post("/", upload.single("image"), addDoctor);

export default router;
