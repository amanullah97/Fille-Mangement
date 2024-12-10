import { Router } from "express";
import { uploadFiles } from "../controllers/file.controllers";
import { upload } from "../middleware/upload";

export const fileRouter = Router();
//  starts with /api/files
fileRouter.get("/", (req, res) => { });
fileRouter.post("/", upload.array('files', 10), uploadFiles);