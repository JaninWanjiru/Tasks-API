import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express()
const client = new PrismaClient()

app.get("/", (req, res) => {
    res.send("<h1>You've unlocked the Tasks API</h1>")
})

let port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log(`App is listening on port ${8800}`)
});