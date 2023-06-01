import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv'
import Project from './models/project.model';
import ProjectImages from './models/projectImages.model';
import User from './models/user.model';

dotenv.config()

const sequelize = new Sequelize(
  {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "logging": false,
  }
)

sequelize.addModels([
  User,
  ProjectImages,
  Project,
])

console.log(sequelize.models,)

export default sequelize
