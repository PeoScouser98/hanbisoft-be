import express from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/auth/signin', authController.signin);
router.get('/auth/info', authMiddleware.checkAuthenticated, authController.getUserInfo);
router.get('/auth/refresh-token/:authId', authController.refreshToken);
router.post('/auth/recover-password', authController.recoverPassword);
router.patch('/auth/update-info', authMiddleware.checkAuthenticated, authController.updateUser);
router.patch('/auth/change-password', authMiddleware.checkAuthenticated, authController.changePassword);

export default router;
