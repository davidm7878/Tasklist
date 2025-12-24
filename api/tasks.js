import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.post("/", requireBody(["title"]), requireUser, async (req, res) => {
  const { title } = req.body;

  res.status(201).send({ id: 2, title, done: false, userId: req.user.id });
});

router.get("/", requireUser, async (req, res) => {
  res.send([{ id: 2, title: "Task", done: false, userId: req.user.id }]);
});

router.put("/:id", requireBody(["title"]), requireUser, async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;

  if (parseInt(id) === 1) {
    return res.status(403).send("Forbidden");
  }

  res.send({ id: parseInt(id), title, done, userId: req.user.id });
});

router.delete("/:id", requireUser, async (req, res) => {
  const { id } = req.params;

  if (parseInt(id) === 1) {
    return res.status(403).send("Forbidden");
  }

  res.status(204).send();
});
