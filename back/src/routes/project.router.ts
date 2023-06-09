import express from "express";
import multer from "multer";
import ProjectController from "../controllers/project.controller";
const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/', ProjectController.getAll)
router.post('/', upload.any(), ProjectController.create)
router.get('/:name', ProjectController.getByProjectName)
router.get('/:name/file', ProjectController.get3dFileByProjectName)

export default router
