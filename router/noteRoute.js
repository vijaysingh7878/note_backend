import express from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controller/noteController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const noteRouter = express.Router();

noteRouter.post("/",verifyToken, createNote);
noteRouter.get("/", verifyToken, getNotes);
noteRouter.put("/:id", verifyToken, updateNote);
noteRouter.delete("/:id", verifyToken, deleteNote);

export default noteRouter;