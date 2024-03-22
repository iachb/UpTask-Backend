import type { Request, Response } from "express";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
      // Create a new task
    }
    catch (error) {
      console.log(error);
    }
  }
}