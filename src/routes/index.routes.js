import { Router } from "express";
import { index, profile } from "../controllers/index.controllers.js";
import { ifauth, ifnoauth } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", ifnoauth, index);
router.get("/profile", ifauth, profile);

export default router;
