import React from 'react'
import Start from './Components/Start'
import {Route, Routes} from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import UserWrapper from './Components/UserWrapper'

const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={
          <UserWrapper>
            <Home/>
        </UserWrapper>} />
      </Routes>
    </div>
  )
}

export default App
