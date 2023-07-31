import { Column, Default, HasMany, Model, Table } from 'sequelize-typescript'
import ProjectImages from './projectImages.model'
import ProjectTextures from './projectTextures.model '

@Table
export default class Project extends Model {
    @Column
    name: string

    @Column
    objPath: string

    @Column
    mtlPath: string

    @HasMany(() => ProjectTextures)
    textures: ProjectTextures[]

    @HasMany(() => ProjectImages)
    images: ProjectImages[]

    @Default(true)
    @Column
    isPublished: Boolean
}
