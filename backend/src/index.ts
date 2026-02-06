import taskRoutes from './routes/taskRoutes';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login } from './controllers/authController';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Requirements: Auth Endpoints
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));