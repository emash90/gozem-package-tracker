import io from 'socket.io-client'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ClientDashboard from './pages/ClientDashboard'
import DriverDashboard from './pages/DriverDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/ClientHeader'
import { useSelector } from 'react-redux'
import Home from './pages/Home'


const socket = io.connect('https://packagedeliveryapp.herokuapp.com')
const App = () => {
  const {user} = useSelector((state) => state.auth)
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin/*' element={<AdminDashboard />} />
            <Route path='/client/*' element={<ClientDashboard />} />
            <Route path='/driver/*' element={<DriverDashboard />} />
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

