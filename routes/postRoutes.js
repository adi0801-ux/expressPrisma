import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../Controller/PostController.js";
const router = Router();
 router.post("/",createPost);
 router.put("/:id", updatePost);
 router.get("/:id", getPost);
 router.get("/", getAllPosts);
 router.delete("/delete/:id", deletePost);
export default router;