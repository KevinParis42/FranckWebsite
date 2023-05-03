import { Sequelize } from 'sequelize-typescript';
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

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


const basename = path.basename(__filename);

fs
  .readdirSync(__dirname + '/models')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log(path.join(__dirname + '/models', file))
    sequelize.addModels([path.join(__dirname + '/models', file)])
  });

console.log(sequelize.models)

export default sequelize
