import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { indexRouter } from "./routes/__index_router__";
import path from "path";
import fs from "fs";
const app = express();

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure the uploads folder exists
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});
app.use("/api", indexRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
