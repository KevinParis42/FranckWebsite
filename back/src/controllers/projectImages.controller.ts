import { Request, Response } from "express"
import ProjectImagesService from "../services/projectImages.service"


export default class ProjectImagesController {

    static getAll = async (req: Request, res: Response) => {
        try {
            res.json(await ProjectImagesService.getAll())
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    static getByProjectId = async (req: Request, res: Response) => {
        try {
            res.json(await ProjectImagesService.getByProjectId(parseInt(req.params.projectId)))
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

}
