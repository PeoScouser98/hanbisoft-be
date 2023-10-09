import express from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/users', AuthMiddleware.checkAuthenticated, AuthMiddleware.checkIsAdmin, UserController.getUsers);
router.patch('/users', AuthMiddleware.checkAuthenticated, AuthMiddleware.checkIsSuperAdmin, UserController.putUsers);
router.delete(
	'/users/deactivate',
	AuthMiddleware.checkAuthenticated,
	AuthMiddleware.checkIsSuperAdmin,
	UserController.deleteUsers
);

export default router;
