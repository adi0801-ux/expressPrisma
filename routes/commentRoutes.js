import { Router } from "express";
import { createComment, deleteComment, getAllComment, getComment, updateComment } from "../Controller/commentController.js";
const router = Router();
 router.post("/",createComment);
 router.put("/:id", updateComment);
 router.get("/:id", getComment);
 router.get("/", getAllComment);
 router.delete("/delete/:id", deleteComment);
export default router;