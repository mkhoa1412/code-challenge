import { Router } from "express";
import { resourceController } from "../controllers/resource.controller";

const router = Router();

router.post("/", (req, res) => resourceController.create(req, res));
router.get("/", (req, res) => resourceController.getAll(req, res));
router.get("/:id", (req, res) => resourceController.getById(req, res));
router.put("/:id", (req, res) => resourceController.updateById(req, res));
router.delete("/:id", (req, res) => resourceController.deleteById(req, res));

export default router;
