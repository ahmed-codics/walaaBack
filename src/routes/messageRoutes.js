import express from 'express'
import { sendMessage , getMessage , deleteMessage } from '../controllers/messageController.js'
import { protectRoute } from '../middlewares/authMiddle.js';

const router = express.Router();

router.post('/' , protectRoute, sendMessage);
router.get('/convo' , protectRoute, getMessage);
router.delete(':/messageId' , protectRoute, deleteMessage);

export default router;
