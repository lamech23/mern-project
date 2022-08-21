import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
 import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails=({ workout })=> {
    const {dispatch}=useWorkoutContext()

    const handelClick = async ()=>{
        const response = await fetch('http://localhost:4000/api/workout/'+ workout._id,{
            method:'DELETE'
        })
        const json = await response.json()

        if(response.ok){
        dispatch({type:'DELETE_WORKOUT' , payload:json})
        }
    }
    

  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg)</strong>{workout.load}</p>
        <p><strong>Reps</strong> {workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        <span className='material-symbols-outlined' style={{color:'red'}} onClick={handelClick} >delete</span>

    </div>
  )
}

export default WorkoutDetails