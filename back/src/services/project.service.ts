import { Optional } from "sequelize"
import Project from "../db/models/project.model"
// @ts-ignore
import obj2gltf from "obj2gltf"
import fs from 'fs'
import ProjectImages from "../db/models/projectImages.model"

type createBody = {
    name: string,
    filepath: string,
    images: Express.Multer.File[]
}


export default class ProjectService {
    static getAll = () => {
        return Project.findAll({ include: { all: true } })
    }

    static create = async (body: createBody) => {
        const gltf = await obj2gltf(body.filepath)
        // @ts-ignore
        const data = Buffer.from(JSON.stringify(gltf))
        fs.writeFileSync(`uploads/${body.name}.gltf`, data);
        fs.unlinkSync(body.filepath)
        return Project.create({
            ...body,
            filepath: `uploads/${body.name}.gltf`,
            images: body.images.map((image) => { return { name: image.fieldname, imagePath: image.path.replace('uploads/', '') } })
        }, { include: [ProjectImages] })
    }

    static getByName = (name: string) => {
        return Project.findOne({ where: { name: name }, include: { all: true } })
    }
}
