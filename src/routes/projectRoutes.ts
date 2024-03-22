import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middleware/validation";
import { validateProjectExist } from "../middleware/project";

const router = Router();

/** Routes for projects */
router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("clientName").notEmpty().withMessage("Client name is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the project is required"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  body("projectName").notEmpty().withMessage("Project name is required"),
  body("clientName").notEmpty().withMessage("Client name is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the project is required"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Invalid project id"),
  handleInputErrors,
  ProjectController.deleteProject
);

/** Routes for tasks */

router.param("projectId", validateProjectExist);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("Task name is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the task is required"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTask);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid project id"),
  handleInputErrors,
  TaskController.getTaskbyId
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Invalid project id"),
  body("name").notEmpty().withMessage("Task name is required"),
  body("description")
    .notEmpty()
    .withMessage("Description of the task is required"),
  handleInputErrors,
  TaskController.updateTask
);

export default router;
