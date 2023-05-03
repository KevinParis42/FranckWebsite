import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import sequelize from './db'

import indexRouter from './routes/index'

let app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(indexRouter)

sequelize.sync({force: true}).then(()=> {
    console.log('connected')
})

export default app

