import express from 'express'
import Doctor from '../models/DoctorModel.js'
import { fetchDocs, getDoctor, addDoctor, deleteDoctor } from '../controllers/doctorController.js';
import upload from '../config/multerConfig.js'; // <-- use this one

const router = express.Router();

router.get("/", fetchDocs);
router.get("/:id", getDoctor);
router.post("/doctors", upload.single("image"), addDoctor);
router.delete("/:id", deleteDoctor);

export default router;
