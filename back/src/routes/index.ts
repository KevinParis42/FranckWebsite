import express from 'express'
import projectRouter from './project.router'
import projectImagesRouter from './projectImages.router'

const router = express.Router()

router.use('/project', projectRouter)
router.use('/projectImages', projectImagesRouter)


export default router
