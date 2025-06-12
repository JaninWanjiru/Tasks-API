import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>You've unlocked the Tasks API</h1>");
});


// Get all tasks
app.get("/tasks", async (_req, res) => {
  try {
    const tasks = await client.task.findMany();
    res.status(200).json(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "There's an issue somewhere" });
  }
});

// Create tasks
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await client.task.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(newTask);
  } catch (e) {
    res.status(500).json({ message: "There's an issue somewhere" });
  }
});


// Get a specific task
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const specificTask = await client.task.findFirst({
      where: {
        id,
      },
    });
    if (!specificTask) {
      return req.status(404).json({ message: "Task unavailable" });
    }
    res.status(200).json(specificTask);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "There's an issue somewhere" });
  }
});


// Update a specific task
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    const { id } = req.params;
    const tasks = await client.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        isCompleted,
      },
    });
    res.status(200).json(tasks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "There's an issue somewhere" });
  }
});

// Delete a task
// app.delete("/tasks/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await client.task.delete({
//       where: {
//             id
//     },
//     });
//     res.status(200).json({
//       message: `Task has been deleted `,
//     });
//   } catch (error) {
//     console.error(e);
//     res.status(500).json({ message: `Something went wrong` });
//   }
// });

let port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`App is listening on port ${8800}`);
});
