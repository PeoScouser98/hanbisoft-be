import express from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signin', userController.signin);
router.post('/create-user', authMiddleware.checkAuthenticated, authMiddleware.checkIsAdmin, userController.createUser);
router.get('/users', authMiddleware.checkAuthenticated, authMiddleware.checkIsAdmin, userController.getUsers);
router.get('/refresh-token/:authId', userController.refreshToken);

export default router;
