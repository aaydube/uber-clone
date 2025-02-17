import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DriverWrapper = (
    {children}
) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        if(!token){
            navigate("/driver-login")
        }
    }, [token])
    
  return (
    <div>
        {children}
    </div>
  )
}

export default DriverWrapper
