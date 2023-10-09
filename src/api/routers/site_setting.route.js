import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import SiteSettingController from '../controllers/site_setting.controller';
import multer from 'multer';

const upload = multer();
const router = express.Router();

// router.use(AuthMiddleware.checkAuthenticated);
router.patch(
	'/site-settings/update',
	AuthMiddleware.checkAuthenticated,
	AuthMiddleware.checkIsSuperAdmin,
	upload.any(),
	SiteSettingController.updateSiteSettings
);

export default router;
