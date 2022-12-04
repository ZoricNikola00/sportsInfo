import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import * as dotenv from 'dotenv'
dotenv.config()

const app=express()

app.use(bodyParser.json({limit:'30mb'}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)
const mongoURI=process.env.MONGO_DB_CODE || '';
const PORT=process.env.PORT || 5000;

mongoose.connect(mongoURI)
.then(()=>{app.listen(PORT), console.log(`Server is running on port ${PORT}`)})
.catch(err=>console.log(err))