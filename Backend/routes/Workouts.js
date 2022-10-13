 const express =require('express')
const{
   createWorkout,
   getWorkouts,
   getWorkout,
   deleteWorkout ,
   updateWorkout
}=require('../controllers/WorkoutController')
const requireAuth =require('../middleware/requireAuth')
 //handle attachment
 const router = express.Router()
// what this does it fires the middleware be4 the otherrouters 
router.use(requireAuth)

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
