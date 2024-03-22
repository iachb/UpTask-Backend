import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      const error = new Error("Project not found");
      return res.status(404).json({ error: error.message });
    }
    try {
      const task = new Task(req.body);
      task.project = project._id;
      project.tasks.push(task._id);
      await task.save();
      await project.save();
      res.send("Task created");
    } catch (error) {
      console.log(error);
    }
  };
}
