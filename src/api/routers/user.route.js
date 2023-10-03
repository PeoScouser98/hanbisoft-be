import express from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/users', AuthMiddleware.checkAuthenticated, AuthMiddleware.checkIsAdmin, UserController.getUsers);
router.put('/users', AuthMiddleware.checkAuthenticated, AuthMiddleware.checkIsSuperAdmin, UserController.putUsers);

export default router;
