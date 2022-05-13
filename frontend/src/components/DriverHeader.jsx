import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function DriverHeader() {
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const {user} = useSelector((state) => state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
        toast('logged out!')
    }
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Gozem Package-Tracker</Link>
            <h3>Hi {user ? user.name : 'Guest'}</h3>
        </div>
        <ul>
            {user ? (<>
                <li>
                <Link to='/driver/allpackages'>
                   Available Packages
                </Link>
                </li>
                <li>
                <Link to='/driver/deliveries'>
                   My deliveries
                </Link>
                </li>
            
            
            <li>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt />
                    Logout
                </button>
            </li>
            
            </>) : (<>
            <li>
                <Link to='/login'>
                    <FaSignInAlt />
                    Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser />
                    Register
                </Link>
            </li>
            </>)}
        </ul>
    </header>
  )
}

export default DriverHeader