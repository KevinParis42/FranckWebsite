import { Optional } from "sequelize"
import ProjectImages from "../db/models/projectImages.model"

export default class ProjectImagesService {
    static getAll = () => {
        return ProjectImages.findAll({ include: { all: true } })
    }

}
