import express from 'express';
import { OneUser, AllUsers, Login, Register, Logout  } from '../controllers/userController.js';
import { AllItems, OneItem, RegisterItem, DeleteItem } from '../controllers/itemController.js';
import { refreshToken } from '../controllers/RefreshToken.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

// User Routes
router.get('/users/#', verifyToken, OneUser);
router.get('/users', verifyToken, AllUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

// Item Routes
router.get('/items', AllItems);
router.get('/items/#', OneItem);
router.post('/items/new', RegisterItem);
router.delete('/items/delete', DeleteItem);

export default router;