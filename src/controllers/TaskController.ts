import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project._id;
      req.project.tasks.push(task._id);
      await task.save();
      await req.project.save();
      res.send("Task created");
    } catch (error) {
      console.log(error);
    }
  };
}
