import Project from "../db/models/project.model"
import ProjectImages from "../db/models/projectImages.model"

export default class ProjectImagesService {
    static getAll = () => {
        return ProjectImages.findAll({ include: { all: true } })
    }

    static getByProjectId = (projectId: number) => {
        return ProjectImages.findAll({ include: [{ model: Project, where: { id: projectId } }] })
    }

}
