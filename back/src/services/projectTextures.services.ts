import Project from "../db/models/project.model"
import ProjectTextures from "../db/models/projectTextures.model "

export default class ProjectTexturesService {
    static getAll = () => {
        return ProjectTextures.findAll({ include: { all: true } })
    }

    static getByProjectId = (projectId: number) => {
        return ProjectTextures.findAll({ include: [{ model: Project, where: { id: projectId } }] })
    }

}
