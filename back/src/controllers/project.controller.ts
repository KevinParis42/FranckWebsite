import { Request, Response } from "express"
import ProjectService from "../services/project.service"
import { join } from "path"


export default class ProjectController {

    static getAll = async (req: Request, res: Response) => {
        try {
            res.json(await ProjectService.getAll())
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            if (!req.files) {
                res.sendStatus(400)
                return
            }
            // @ts-ignore
            const path = req.files[0].path;
            // @ts-ignore
            const images: Express.Multer.File[] = req.files.slice(1)
            res.json(await ProjectService.create({ ...req.body, filepath: path, images }))
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    static get3dFileByProjectName = async (req: Request, res: Response) => {
        try {
            const project = await ProjectService.getByName(req.params.name)
            if (!project || !project.filepath) {
                res.sendStatus(500)
                return
            }

            const filepath = join(process.cwd(), project.filepath);

            res.sendFile(filepath)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    static getByProjectName = async (req: Request, res: Response) => {
        try {
            const project = await ProjectService.getByName(req.params.name)
            if (!project)
                return res.sendStatus(500)
            res.json(project)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }
}
