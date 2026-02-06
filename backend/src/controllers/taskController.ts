// src/controllers/taskController.ts
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Get All Tasks (Requirement: Search & Filter integrated)
export const getTasks = async (req: any, res: Response) => {
  const { status, search } = req.query; // URL parameters
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId, // Sirf login user ke tasks
        // Requirement: Filter by status (e.g., pending/completed)
        status: status ? String(status) : undefined,
        // Requirement: Search by title (Case-insensitive)
        title: search ? { contains: String(search), mode: 'insensitive' } : undefined
      },
      orderBy: { createdAt: 'desc' } // Naye tasks upar dikhenge
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// 2. Create Task
export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.userId // Token se aayi user ID
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Task creation failed", error });
  }
};

// 3. Update Task (Requirement: Status ya content badalne ke liye)
export const updateTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { status, title, description } = req.body;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { status, title, description }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// 4. Delete Task
export const deleteTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id) }
    });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};