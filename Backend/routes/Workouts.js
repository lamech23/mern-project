 const express =require('express')
 const router = express.Router()
const{
   createWorkout,
   getWorkouts,
   getWorkout,
   deleteWorkout ,
   updateWorkout
}=require('../controllers/WorkoutController')
 //handle attachment
 // to get all workouts
router.get('/',  getWorkouts )
 //to get a single workout
router.get("/:id",getWorkout)   
 // post a new work out
router.post('/',createWorkout)
 //to delete a work out
router.delete('/:id', deleteWorkout )
 // to update  
router.patch('/:id' ,updateWorkout )

 module.exports =router
