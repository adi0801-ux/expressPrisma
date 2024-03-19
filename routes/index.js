import { Router } from "express";
import {router} from './userRoutes.js'
import PostRoutes from './postRoutes.js'
import CommentRoutes from './commentRoutes.js'
const routerM=Router()

routerM.use("/api/comment", CommentRoutes)
routerM.use("/api/post", PostRoutes)
routerM.use("/api/user", router)
export default routerM;