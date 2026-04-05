import { Router } from "express";
import { getExecutionHandler, listExecutionHandler, runExecutionPlaceholderHandler } from "../controllers/execution.controller";

const router = Router();

router.get("/", listExecutionHandler);
router.get("/:id", getExecutionHandler);
router.post("/workflows/:workflowId/run", runExecutionPlaceholderHandler);

export default router;
