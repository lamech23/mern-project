const Workout =require('../models/WorkoutModel')
const mongoose =require('mongoose')
// get all workout
const getWorkouts= async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async(req ,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout =await Workout.findById(id)
    if(!workout){
        // we return because it will carry on to run the code
        return res.status(404).json({error: 'No such workout'})
    }
    // the reason for  status 200 is because this means if we have not found it we have found 
    res.status(200).json(workout)
}


//create a new workout
const createWorkout =async (req,res)=>{
    const{title , load, reps }=req.body
// handling errors to displayed on the browser
let emptyFields=[]
if(!title){
    emptyFields.push('title')
}
if(!load){
    emptyFields.push('load')
}
if(!reps){
    emptyFields.push('reps')
}
// this last if chech is to detect if there is anything on one input and the rest are has nothing
if(emptyFields.length > 0){
   return  res.status(400).json({error:'All fields must be field', emptyFields})
}


    // adding a document to db
    try{
    const  workout =  await Workout.create({title ,load ,reps})
    res.status(200).json(workout)
    }catch(error){
       res.status(400).json({error:error.message})
 
    }

}

//delete a workout
const deleteWorkout =async(req ,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(400).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req,res)=>{
    const{ id }= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No  such workout'})
    }
    // lets update it
    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}


module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout ,
    updateWorkout

}