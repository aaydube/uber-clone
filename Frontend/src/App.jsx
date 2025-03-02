import React from 'react'
import Start from './Components/Start'
import {Route, Routes} from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import UserWrapper from './Components/UserWrapper'
import DriverLogin from './Components/DriverLogin'
import DriverRegister from './Components/DriverRegister'
import DriverWrapper from './Components/DriverWrapper'
import DriverDash from './Components/DriverDash'

const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/driver-login' element={<DriverLogin/>} />
        <Route path='/driver-register' element={<DriverRegister/>} />
        <Route path='/driver-dashboard' element={
          <DriverWrapper>
            <DriverDash/>
           </DriverWrapper>
        } />
        <Route path='/home' element={
          <UserWrapper>
            <Home/>
        </UserWrapper>
      } />
      </Routes>
    </div>
  )
}

export default App
