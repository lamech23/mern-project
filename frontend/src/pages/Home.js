import React,{useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/UseAuthContext'

//componets
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'



const Home=()=> {
  const {user}=useAuthContext()
  // const [workouts , setWorkouts]=useState(null)
  const {workout ,dispatch}=useWorkoutContext()

  useEffect(() =>{
   const fetchWorkout = async () =>{
    const response = await fetch('http://localhost:4000/api/workout',{
    headers:{
      'Authorization':`Bearer ${user.token}`
    }
  })
    //passing a json to work with basically giving  us an array of objects
    const json = await response.json()

    //performing an ok property to check if everything is okay
    if(response.ok){
      dispatch({type:'SET_WORKOUT', payload:json})
    }

   }
   if(user){
    fetchWorkout()

   }
        
  },[dispatch ,user])
  return (
    <div className='home'>
       <div className="workouts">
      {/* cyclng through the workouts only if there are avalable */}

      {workout && workout.map((workout)=>(
        <WorkoutDetails key={workout._id} workout={workout}/>
      ))}

       </div>
       <WorkoutForm/>
    </div>
  )
}

export default Home