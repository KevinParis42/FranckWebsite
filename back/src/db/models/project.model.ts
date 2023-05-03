import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class Project extends Model {
    @Column
    name: string;

    @Column
    description: string;
}
