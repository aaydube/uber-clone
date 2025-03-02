import React, { createContext, useState } from 'react'

export const DriverDataContext = createContext()
const DriverContext = ({children}) => {
    const [driver, setdriver] = useState({})
    
  return (
    <DriverDataContext.Provider value={{driver, setdriver}}>
      {children}
    </DriverDataContext.Provider>
  )
}

export default DriverContext
