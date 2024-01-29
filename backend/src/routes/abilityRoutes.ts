import express from 'express';
import { getAbilities } from '../controllers/abilityController';
const router = express.Router();

router.get('/abilities', getAbilities);

export default router;
