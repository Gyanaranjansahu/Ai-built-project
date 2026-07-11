import React from 'react'
import { useContext } from 'react'
import { authContext } from '../authentication/authcontect'
import { Navigate } from 'react-router-dom'
import LoadingPage from '../page/loading.jsx'
const Protect = ({children}) => {
  // const navigate=useNavigate()
    const{user , loading}=useContext((authContext))
    if(loading){
      return <LoadingPage/>
    }
    if(user==null){
      return  <Navigate to="/login"/>
    }
  return children
}

export default Protect
