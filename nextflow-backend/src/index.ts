import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { env } from "./config/env";
import workflowRoutes from "./routes/workflow.routes";
import executionRoutes from "./routes/execution.routes";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_request: Request, response: Response) => {
  response.json({
    ok: true,
    service: "nextflow-backend",
  });
});

app.use("/api/workflows", workflowRoutes);
app.use("/api/executions", executionRoutes);

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : "Internal server error";
  const statusCode = message === "Not found" ? 404 : 500;

  response.status(statusCode).json({
    error: message,
  });
});

app.listen(env.PORT, () => {
  console.log(`Backend listening on http://localhost:${env.PORT}`);
});
