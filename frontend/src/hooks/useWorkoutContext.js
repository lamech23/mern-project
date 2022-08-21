import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContect"



export const useWorkoutContext = () =>{
    const context = useContext(WorkoutContext)


    if(!context){
        throw Error('useWorkoutContext must be used inside an workoutContextprovider')
    }
    return context
}