import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express + TypeScript!");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
