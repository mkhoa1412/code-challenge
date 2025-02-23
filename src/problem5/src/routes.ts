import express from "express";
import {
  createResource,
  deleteResource,
  getResource,
  listResources,
  updateResource,
} from "./controllers";

const router = express.Router();

// Define routes for resource management
router.route("/resources").post(createResource).get(listResources);

router
  .route("/resources/:id")
  .get(getResource)
  .put(updateResource)
  .delete(deleteResource);

export default router;
