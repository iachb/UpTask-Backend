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
      console.log(error);
    }
  };
}
