import React from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import Home from './Home'

function Login() {
    const [formData, setFormData] =useState({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, userType, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess) {
            if(user.userType === "client"){
                toast('welcome client')
                navigate('/client/packages')
            } else {
                toast('welcome driver')
                navigate('/driver/deliveries')
            }
            }  

        dispatch(reset())
    }, [
        user, userType, isError, isSuccess, message, navigate, dispatch
    ])
    if(isLoading) {
        return <Spinner />
    }
  return (
    <>
    <Home />
    <section className='heading'>
        <h5>
            <FaSignInAlt /> Login
        </h5>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                    type='email'
                    name='email'
                    className='form-control'
                    id='email'
                    value={email}
                    placeholder='Enter your email address'
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input 
                    type='text'
                    name='password'
                    className='form-control'
                    id='password'
                    value={password}
                    placeholder='Enter password'
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <button type='submit' className='btn btn-block'>Login</button>
            </div>
            <div className="form-group">
                    <p>No account? <a href="/register">Register</a> </p>
                </div>
        </form>
    </section>
    
</>
  )
}

export default Login