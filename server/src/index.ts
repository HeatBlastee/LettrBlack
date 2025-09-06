import { group } from "console";
import express from "express";
import type { Request, Response } from "express";

import groupRoute from "./routes/group.route";
import noteRoute from "./routes/notes.route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/groups", groupRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

app.use("/api/notes", noteRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
