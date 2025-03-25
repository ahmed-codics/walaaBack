import express from 'express'
import Doctor from '../models/DoctorModel.js'
import { fetchDocs, getDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.get("/" , fetchDocs);
router.get("/:id" , getDoctor);

export default router;
