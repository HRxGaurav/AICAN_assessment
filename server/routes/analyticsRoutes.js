import express from 'express';
import { getClassAnalytics, getFinancialAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();


router.get('/analytics_class/:id', getClassAnalytics);


router.get('/analytics_financial', getFinancialAnalytics);

export default router;
