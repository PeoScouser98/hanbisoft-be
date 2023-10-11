import express from 'express';
import MenuNavigationController from '../controllers/menu_navigation.controller';

const router = express.Router();

router.get('/menu-navigations', MenuNavigationController.getNavigation);
router.patch('/menu-navigations', MenuNavigationController.upsertNavigation);
router.delete('/menu-navigations', MenuNavigationController.deleteNavigation);

export default router;
