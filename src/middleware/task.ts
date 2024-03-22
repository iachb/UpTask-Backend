import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

// Extend the Express Request interface to include a project property
declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function taskExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found");
      return res.status(404).json({ error: error.message });
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}