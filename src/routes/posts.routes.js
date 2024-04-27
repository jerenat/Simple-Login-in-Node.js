import { Router } from "express";
import { posts } from "../controllers/posts.controllers.js";
import { ifauth, getid } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/post", ifauth, getid, posts);


export default router;