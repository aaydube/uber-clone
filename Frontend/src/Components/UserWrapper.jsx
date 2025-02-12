import React, { useEffect } from 'react'
import { useNavigate } from "react-router";

const UserWrapper = (
    {children}
) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        if(!token){
            return navigate("/login")
        }
    }, [token])
    
  return (
    <div>
        {children}
    </div>
  )
}

export default UserWrapper
