import { Request, Response } from "express"
import ProjectService from "../services/project.service"
import { readFileSync } from 'fs'
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
            if (!req.file) {
                res.sendStatus(400)
                return
            }
            const path = req.file.path;
            res.json(await ProjectService.create({ ...req.body, filepath: path }))
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const project = await ProjectService.getByName(req.params.name)

            if (!project)
                return res.sendStatus(500)
            if (project && !project.filepath) {
                res.json(project)
            }

            const filepath = join(process.cwd(), project.filepath);

            res.sendFile(filepath)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    }
}
