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
      res.send("Task created succesfully");
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
      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      res.send("Task updated succesfully");
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      // Remove the task id from the project tasks array
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      );
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.send("Task deleted succesfully");
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      req.task.status = status;
      await req.task.save();
      res.send("Task status updated succesfully");
    } catch (error) {
      res.status(500).json({ error: "There's been an error" });
    }
  };
}
