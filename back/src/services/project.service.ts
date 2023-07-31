import * as fs from 'fs'
import Project from "../db/models/project.model"
import ProjectImages from "../db/models/projectImages.model"
import ProjectTextures from "../db/models/projectTextures.model "

type createBody = {
    isPublished: boolean,
    id: number,
    name: string,
    objPath: string,
    mtlPath: string,
    textures: ProjectTextures[],
    images: ProjectImages[],
    updatedAt: Date,
    createdAt: Date
}


export default class ProjectService {

    static #transformFileArray = (files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }) => {
        return Array.isArray(files) ? files : undefined
    }

    static getAll = () => {
        return Project.findAll({ include: { all: true } })
    }

    static create = async (body: createBody, files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }) => {
        const fileArray = this.#transformFileArray(files)
        if (!fileArray)
            return
        const obj = fileArray.filter((file) => file.fieldname.includes('Obj'))[0]
        fs.renameSync(`uploads/${obj.filename}`, `uploads/${body.name}.obj`)

        const mtl = fileArray.filter((file) => file.fieldname.includes('Mtl'))[0]
        fs.renameSync(`uploads/${mtl.filename}`, `uploads/${body.name}.mtl`)

        const images = fileArray.filter((file) => file.fieldname.includes('Image'))
        const textures = fileArray.filter((file) => file.fieldname.includes('Textures'))
        textures.forEach(texture => {
            fs.renameSync(`uploads/${texture.filename}`, `uploads/${texture.originalname}`)
        })
        return Project.create({
            name: body.name,
            objPath: `uploads/${body.name}.obj`,
            mtlPath: `uploads/${body.name}.mtl`,
            textures: textures.map((texture) => { return { name: texture.fieldname } }),
            images: images.map((image) => { return { name: image.fieldname, imagePath: image.path.replace('uploads/', '') } })
        }, { include: [ProjectImages, ProjectTextures] })
    }

    static getByName = (name: string) => {
        return Project.findOne({ where: { name: name }, include: { all: true } })
    }

    static deleteById = (id: number) => {
        return Project.destroy({ where: { id: id } })
    }

    static updateById = async (id: number, body: any) => {
        return Project.update({ ...body }, { where: { id: id } })
    }
}
