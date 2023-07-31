import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import Project from './project.model'

@Table
export default class ProjectImages extends Model {
    @Column
    name: string

    @Column
    imagePath: string

    @ForeignKey(() => Project)
    @Column
    projectId: number

    @BelongsTo(() => Project, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    })
    project: Project
}

