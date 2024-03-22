import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      // Assign the project id to the task
      task.project = req.project._id;
      // Push the task id to the project tasks array
      req.project.tasks.push(task._id);
      await Promise.all([task.save(), req.project.save()]);
      res.send("Task created");
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };

  static getProjectTask = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project._id }).populate('project');
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };
}
