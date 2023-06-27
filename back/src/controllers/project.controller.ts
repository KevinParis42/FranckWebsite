import { Request, Response } from "express"
import ProjectService from "../services/project.service"


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
            res.json(await ProjectService.create({ ...req.body }, req.files))
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

    static deleteById = (req: Request, res: Response) => {
        try {
            ProjectService.deleteById(parseInt(req.params.id))
            res.sendStatus(204)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    static updateById = async (req: Request, res: Response) => {
        try {
            ProjectService.updateById(parseInt(req.params.id), { ...req.body })
            res.sendStatus(204)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }
}
