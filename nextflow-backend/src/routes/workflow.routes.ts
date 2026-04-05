import { Router } from "express";
import {
  createWorkflowHandler,
  deleteWorkflowHandler,
  getWorkflowHandler,
  listWorkflowHandler,
  runWorkflowHandler,
  updateWorkflowHandler,
} from "../controllers/workflow.controller";

const router = Router();

router.get("/", listWorkflowHandler);
router.post("/", createWorkflowHandler);
router.get("/:id", getWorkflowHandler);
router.patch("/:id", updateWorkflowHandler);
router.delete("/:id", deleteWorkflowHandler);
router.post("/:workflowId/run", runWorkflowHandler);

export default router;
