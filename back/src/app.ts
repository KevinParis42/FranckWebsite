import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import logger from 'morgan'
import sequelize from './db'

import indexRouter from './routes/index'

let app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('uploads/'))
app.use(indexRouter)

sequelize.sync({ force: true }).then(() => {
    console.log('connected')
})

export default app

