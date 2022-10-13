import { createContext ,useEffect,useReducer} from "react";
export const AuthContext =createContext()

export const authReducer =(state , action)=>{
    switch(action.type){
        case 'LOGIN':
            return{user:action.payload}
        case 'LOGOUT':
            return{user : null}
        default :
            return state
    }

}

export const AuthContextProvider =({children})=>{
    const [state ,dispatch] =useReducer(authReducer,{
        // user :null basically means when a user opens a web he/she is not logged in
        user:null
    })
    console.log('AuthContext  ',state)
// to update the authcontext so ass to stay logged in
    useEffect(()=>{
        const user =JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN' , payload : user})
        }
    },[])

    return(
    <AuthContext.Provider value={{...state ,dispatch}}>
        {children}

    </AuthContext.Provider>
    )
}
 