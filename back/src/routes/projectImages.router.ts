import express from "express"
import ProjectImagesController from "../controllers/projectImages.controller"
const router = express.Router()

router.get('/', ProjectImagesController.getAll)
router.get('/:projectId', ProjectImagesController.getByProjectId)

export default router
