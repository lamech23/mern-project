import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/UseAuthContext'

  const Navbar =()=>{
    const {logout} =useLogout()
    const{user}=useAuthContext()

    const handelClick = ()=>{
      logout()

    }
  return (
   <header className="container">
    <Link to='/'>Workout Buddy </Link>
    <nav>
{/* what is done here is i have conditionally outputed user and the logout btn this means that when you are logged in that is when you only se the logot btn
*then if your not logged in you can't see the btn
*/}
    { user && 
     <div> 
      <span>{user.email}</span>
      <button className='btn' onClick={handelClick}>logout</button>
      </div>}
     {!user && <div>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
      </div>}
    </nav>
   </header>
  )
}

export default Navbar