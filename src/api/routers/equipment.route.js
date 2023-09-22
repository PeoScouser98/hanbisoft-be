import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import equipmentController from '../controllers/equipment.controller';

const router = express.Router();

router.get('/equipments', authMiddleware.checkAuthenticated, equipmentController.getAll);
router.get('/equipments/lookup-values', authMiddleware.checkAuthenticated, equipmentController.getLookupValues);
router.put('/equipments/save', authMiddleware.checkAuthenticated, equipmentController.update);
router.post('/equipments/search', authMiddleware.checkAuthenticated, equipmentController.search);
router.delete('/equipments/delete', authMiddleware.checkAuthenticated, equipmentController.delete);

export default router;
