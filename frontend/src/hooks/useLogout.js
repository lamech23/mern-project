import { useAuthContext } from "./UseAuthContext"


export const useLogout = ()=>{
    const {dispatch}=useAuthContext()
    const logout =()=>{
        // removing user from local storage 
        localStorage.removeItem('user')


        // dispatcing a logout function
        dispatch({type:'LOGOUT' })

    }
    return {logout}
}