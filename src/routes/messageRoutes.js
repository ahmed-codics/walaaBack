import express from 'express'
import { sendMessage , getMessage , deleteMessage , getChatUsers } from '../controllers/messageController.js'
import { protectRoute } from '../middlewares/authMiddle.js';

const router = express.Router();

router.post('/' , protectRoute, sendMessage);
router.get('/convo' , protectRoute, getMessage);
router.delete(':/messageId' , protectRoute, deleteMessage);
router.get('/chats', protectRoute, getChatUsers);

export default router;
