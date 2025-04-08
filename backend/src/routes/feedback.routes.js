import express from 'express';
import { 
  getAllFeedback,
  createFeedback,
  updateFeedbackStatus,
  deleteFeedback 
} from '../controllers/feedback.controller.js';

const router = express.Router();

router.get('/', getAllFeedback);
router.post('/', createFeedback);
router.patch('/:id/status', updateFeedbackStatus);
router.delete('/:id', deleteFeedback);

export { router as feedbackRoutes };
