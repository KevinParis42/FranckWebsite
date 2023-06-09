import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import ProjectImages from './projectImages.model';

@Table
export default class Project extends Model {
    @Column
    name: string;

    @Column
    description: string;

    @Column
    filepath: string;

    @HasMany(() => ProjectImages)
    images: ProjectImages[];
}
