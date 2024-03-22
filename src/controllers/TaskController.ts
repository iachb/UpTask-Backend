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
      // Find all tasks that belong to the project
      const tasks = await Task.find({ project: req.project._id }).populate(
        "project"
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };

  static getTaskbyId = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      if (task.project.toString() !== req.project.id) {
        return res.status(400).json({ error: "Bad request" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      if (task.project.toString() !== req.project.id) {
        return res.status(400).json({ error: "Bad request" });
      }
      task.name = req.body.name;
      task.description = req.body.description;
      await task.save();
      res.send("Task updated");
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId, req.body);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      // Remove the task id from the project tasks array
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== taskId
      );
      await Promise.allSettled([task.deleteOne(), req.project.save()]);
      res.send("Task deleted");
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };
}
