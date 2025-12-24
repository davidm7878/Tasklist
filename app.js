import express from "express";
import usersRouter from "#api/users";
import tasksRouter from "#api/tasks";
import { verifyToken } from "#utils/jwt";

const app = express();
export default app;

// Middleware
app.use(express.json());

// Token verification middleware
app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    try {
      const user = await verifyToken(token);
      req.user = user;
    } catch (err) {
      // Invalid token, user will be undefined
    }
  }
  next();
});

// Routes
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

// Error handlers
app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
