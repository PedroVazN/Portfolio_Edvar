import express from 'express';
import { scheduleVisit } from '../controllers/visitController.js';

const router = express.Router();

// Rota para agendar visita
router.post('/schedule-visit', scheduleVisit);

export default router;
