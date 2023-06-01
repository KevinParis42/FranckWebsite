import express from "express";
import ProjectController from "../controllers/project.controller";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/', ProjectController.getAll)
router.post('/', upload.any(), ProjectController.create)
router.get('/:name', ProjectController.getByProjectName)
router.get('/:name/file', ProjectController.get3dFileByProjectName)

export default router
