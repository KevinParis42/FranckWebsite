import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export default class Project extends Model {
    @Column
    name: string;

    @Column
    description: string;

    @Column
    filepath: string;
}
