import { Optional } from "sequelize"
import Project from "../db/models/project.model"

export default class ProjectService {
    static getAll = () => {
        return Project.findAll()
    }

    static create = (body: Optional<any, string>) => {
        return Project.create(body)
    }

    static getByName =  (name: string) => {
        return Project.findOne({ where: { name: name } })
    }
}
