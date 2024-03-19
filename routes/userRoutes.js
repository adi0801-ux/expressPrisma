import { Router } from "express";
import UserController, { createUser, updateUser, getUser, getAllUser, deleteUser} from "../Controller/UserController.js";
 export const router = Router();
 router.post("/",createUser);
 router.put("/:id", updateUser);
 router.get("/:id", getUser);
 router.get("/", getAllUser);
 router.delete("/delete/:id", deleteUser);
 

 

