import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()
const client = new PrismaClient()

app.get("/", (_req, res) => {
    res.send("<h1>You've unlocked the Tasks API</h1>")
})

app.get("/AllTasks", async (_req, res) => {
    try {
        const tasks = await client.task.findMany();
        res.status(200).json(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "There's an issue somewhere"})
    }
}); 

let port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log(`App is listening on port ${8800}`)
});