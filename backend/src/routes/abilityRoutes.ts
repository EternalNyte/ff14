const express = require('express');
const router = express.Router();
const abilityController = require('../controllers/abilityController');

router.get('/abilities', abilityController.getAbilities);

export default router;
