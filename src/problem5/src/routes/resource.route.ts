import { Router } from "express";
import * as resourceController from "../controllers/resource.controller";

const router = Router()

router.post("/", resourceController.create);
router.put("/:id", resourceController.update);
router.get("/:id", resourceController.getDetail);
router.delete("/:id", resourceController.remove);
router.get("/", resourceController.list);

export default router