import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Home() {
  return (<>
    <header className='header'>
        <div className='logo'>
            <Link to='/login'>Gozem Package-Tracker</Link>
        </div>
        <ul>
    
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
        </ul>
    </header>
    </>
  )
}

export default Home