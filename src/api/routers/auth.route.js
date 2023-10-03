import express from 'express';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/auth/signin', AuthController.signin);
router.get('/auth/info', AuthMiddleware.checkAuthenticated, AuthController.getUserInfo);
router.get('/auth/refresh-token/:authId', AuthController.refreshToken);
router.post('/auth/recover-password', AuthController.recoverPassword);
router.patch('/auth/update-info', AuthMiddleware.checkAuthenticated, AuthController.updateUser);
router.patch('/auth/change-password', AuthMiddleware.checkAuthenticated, AuthController.changePassword);

export default router;
