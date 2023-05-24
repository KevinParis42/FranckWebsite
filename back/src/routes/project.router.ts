import express from "express";
import ProjectController from "../controllers/project.controller";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/', ProjectController.getAll)
router.post('/', upload.single('file'), ProjectController.create)
router.get('/:name', ProjectController.getOne)

export default router
