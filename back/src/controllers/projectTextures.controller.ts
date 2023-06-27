import { Request, Response } from "express"
import ProjectTexturesService from "../services/projectTextures.services"

export default class ProjectTexturesController {

    static getAll = async (req: Request, res: Response) => {
        try {
            res.json(await ProjectTexturesService.getAll())
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    static getByProjectId = async (req: Request, res: Response) => {
        try {
            res.json(await ProjectTexturesService.getByProjectId(parseInt(req.params.projectId)))
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

}
