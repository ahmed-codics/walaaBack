import express from 'express'
import User from '../models/userModel.js'
import { userFetch } from '../controllers/adminController.js';

const router = express.Router();

router.get("/users" , userFetch);



export default router;