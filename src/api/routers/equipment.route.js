import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import EquipmentController from '../controllers/equipment.controller';

const router = express.Router();

router.get('/equipments', AuthMiddleware.checkAuthenticated, EquipmentController.getAllEquipments);
router.get('/equipments/lookup-values', AuthMiddleware.checkAuthenticated, EquipmentController.getLookupValues);
router.put('/equipments/save', AuthMiddleware.checkAuthenticated, EquipmentController.updateEquipments);
router.delete('/equipments/delete', AuthMiddleware.checkAuthenticated, EquipmentController.deleteEquipments);

export default router;
