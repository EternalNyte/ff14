import express from 'express';
import abilityRoutes from './abilityRoutes';
import jobRoutes from './jobRoutes';

const router = express.Router();
router.use('/abilities', abilityRoutes);
router.use('/jobs', jobRoutes);

export default router;

