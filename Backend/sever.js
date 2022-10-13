const express =require('express')
require('dotenv').config()
const mongoose =require('mongoose')
const cors = require ('cors')
const workoutRoutes =require('./routes/Workouts')
const userRoutes =require('./routes/user')
const app =express()

app.use(cors())
//middleware 
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)

next()
})

// routes

app.use('/api/workout',workoutRoutes)
app.use('/api/user',userRoutes)
// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(' connected  to database & listeneing on port ', process.env.PORT)
    })
    
})
.catch((error)=>{
    console.log(error)
})



