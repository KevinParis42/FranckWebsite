import { Optional } from "sequelize"
import Project from "../db/models/project.model"
// @ts-ignore
import obj2gltf from "obj2gltf"
import fs from 'fs'

export default class ProjectService {
    static getAll = () => {
        return Project.findAll()
    }

    static create = async (body: Optional<any, string>) => {
        const gltf = await obj2gltf(body.filepath)
        console.log(gltf)
        // @ts-ignore
        const data = Buffer.from(JSON.stringify(gltf))
        fs.writeFileSync(`uploads/${body.name}.gltf`, data);
        fs.unlinkSync(body.filepath)
        return Project.create({ ...body, filepath: `uploads/${body.name}.gltf` })
    }

    static getByName = (name: string) => {
        return Project.findOne({ where: { name: name } })
    }
}
