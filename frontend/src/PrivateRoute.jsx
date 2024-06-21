import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'


function PrivateRoute({children}) {

    const state = useSelector((state) => state);
    console.log(state)
    const token = state.auth.token;

    if(token){
        return children
      
    }
    else{
        toast.error("Pleasde login to continue")
        return <Navigate to="/"/>

    }
    

  
}

export default PrivateRoute
