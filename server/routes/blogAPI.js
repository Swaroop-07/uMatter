import * as BlogController from '../controller/BlogController.js'
import { Router } from "express";
const router = Router();
router.get("/", BlogController.index);
router.post("/", BlogController.create);
router.patch('/:id', BlogController.update);
router.delete("/:id", BlogController.remove);
router.put('/like', BlogController.like);
router.put('/unlike', BlogController.unlike);
export default router;