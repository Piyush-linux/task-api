import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(createTask));
router.get("/", authMiddleware, asyncHandler(getTasks));
router.get("/:id", authMiddleware, asyncHandler(getTaskById));
router.put("/:id", authMiddleware, asyncHandler(updateTask));
router.delete("/:id", authMiddleware, asyncHandler(deleteTask));

export default router;
