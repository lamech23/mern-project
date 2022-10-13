import { useState } from "react"
import {useAuthContext} from './UseAuthContext'




export const useLogin = ()=>{
    const[error ,setError]=useState(null)
    const [isLoding , setIsLoading]=useState(null)
    const {dispatch}=useAuthContext()


    const login = async (email ,password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email ,password})
        })
        const json  = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save user to local storage this means when a user close the browser and opens back to visit ur website they still have that jwt stored for the user so they are still logged in
            localStorage.setItem('user',JSON.stringify(json))
            // update the Auth context
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)
        }
    }
    return {login, isLoding, error}
}