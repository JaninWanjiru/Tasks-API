import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()
const client = new PrismaClient()

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("<h1>You've unlocked the Tasks API</h1>")
})

app.get("/tasks", async (_req, res) => {
    try {
        const tasks = await client.task.findMany();
        res.status(200).json(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "There's an issue somewhere"})
    }
}); 

app.post("/tasks", async (req, res) => {
    try {
        const {title, description} = req.body
        const newTask = await client.task.create({
            data: {
                title,
                description
            }
        })
        res.status(201).json(newTask)
    } catch (e) {
        res.status(500).json({message: "There's an issue somewhere"})
    }
});

let port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log(`App is listening on port ${8800}`)
});