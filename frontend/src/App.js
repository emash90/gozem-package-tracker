import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ClientDashboard from './pages/ClientDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'


const App = () => {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='*' element={<ClientDashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App

