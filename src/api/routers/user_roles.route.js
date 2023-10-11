import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserRolesController from '../controllers/user_roles.controller';

const router = express.Router();

router.get('/user-roles', AuthMiddleware.checkAuthenticated, UserRolesController.getAllPermission);
router.put(
	'/user-roles/upsert',
	AuthMiddleware.checkAuthenticated,
	AuthMiddleware.checkIsSuperAdmin,
	UserRolesController.upsertUserRoles
);
router.delete(
	'/user-roles/delete',
	AuthMiddleware.checkAuthenticated,
	AuthMiddleware.checkIsSuperAdmin,
	UserRolesController.deletePermission
);

export default router;
