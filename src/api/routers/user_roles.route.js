import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserRolesController from '../controllers/permission.controller';

const router = express.Router();

router.use(AuthMiddleware.checkAuthenticated);
router.get('/user-roles', UserRolesController.getAllPermission);
router.post('/user-roles/create', AuthMiddleware.checkIsSuperAdmin, UserRolesController.createPermission);
router.patch('/user-roles/:id/update', AuthMiddleware.checkIsSuperAdmin, UserRolesController.updatePermission);
router.delete('/user-roles/:id/delete', AuthMiddleware.checkIsSuperAdmin, UserRolesController.deletePermission);

export default router;
