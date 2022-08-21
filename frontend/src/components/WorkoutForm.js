import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

const WorkoukForm =()=> {
  const {dispatch}=useWorkoutContext()
    const[title ,setTitle]=useState('')
    const[load ,setLoad]=useState('')
    const[reps ,setReps]=useState('')
    const[error ,setError]=useState(null)
    const[emptyFields , setEmptyFields]=useState([])

    const handelSubmit =async (e)=>{
        e.preventDefault()
        const workout = {title ,load ,reps}

        const  response =await fetch('http://localhost:4000/api/workout',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{'Content-Type':'application/json'}
        })
        //this means after posting we get information back  and that is will be returned in json form
        const json = await response.json()
//performing an if check if it not okay an error is set and the this error is the error from controllers on create 

        if(!response.ok){
            setError(json.error)
            // the errors from backend are handeld here
            setEmptyFields(json.emptyFields)     
             }
        //so basically is being done here is if the response is okay we do not want the error to be displayed so we set it to null
        // after filling the form we dont want to be deleting details from thr form manually so we reset the form as shown below
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            // console.log('New workout was added',json)
            dispatch({type:'CREATE_WORKOUT' , payload:json})

        }
    }
  return (
    <form  className="create" onSubmit={handelSubmit}>
        <h3>Add a new Workout</h3>
        <label> Excercise Title</label>
        <input type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
//by the use of a tinary operator to check whether the title-field is empty add an error className if that is note true take away the class
      className={emptyFields.includes('title') ? 'error' : ''}
      

         />
          <label> Load (in Kg)</label>
        <input type="Number"
        value={load}
        onChange={(e)=>setLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'error' : ''}

         />
          <label> Reps</label>
        <input type="Number"
        value={reps}
        onChange={(e)=>setReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'error' : ''}

         />
         <button> Add workout</button>
         {error && <div className='errors' >{error}</div>}
    </form>
  )
}

export default WorkoukForm

