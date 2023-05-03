import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class User extends Model {
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    birthday: Date;
}
