import { createContext, useReducer } from "react";
export const WorkoutContext = createContext()

export const workoutsReducer =(state , action)=>{
    switch(action.type){
        case 'SET_WORKOUT':
            return{
                workout: action.payload
            }
            case 'CREATE_WORKOUT':
                return{
                    workout:[action.payload, ...state.workout]
                }
// at delete we re going to filter through the current workout  on the current state
             case 'DELETE_WORKOUT':
                return {
                    workout:state.workout.filter((w)=> w._id !== action.payload._id)
                }   
                default:
                    return state

    }
}

 export const WorkoutContextprovider =({children})=>{
    // the useReducer hook
    // workoutReduction is areducer function name and an initial value of the state

    const[state ,dispatch]=useReducer(workoutsReducer,{
        workout:null
    })
    return(
        <WorkoutContext.Provider value={{...state ,dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}