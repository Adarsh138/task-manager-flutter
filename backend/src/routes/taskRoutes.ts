// src/routes/taskRoutes.ts
import { Router } from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Sabhi task operations ke liye authentication mandatory hai
router.use(authenticate);

// CRUD Routes
router.post('/', createTask);        // Naya task banane ke liye
router.get('/', getTasks);          // Tasks fetch karne ke liye (Search/Filter integrated)
router.put('/:id', updateTask);     // Task update/status change karne ke liye
router.delete('/:id', deleteTask);  // Task delete karne ke liye

export default router;