import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import { FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import Home from './Home'

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        accountType: '',
        email: '',
        password: '',
        password2: ''
    })
    const { firstName, lastName, accountType, email, password, password2 } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            toast(`hey ${user.name}, you can now login`)
            navigate('/login')
        }

        dispatch(reset())
    }, [
        user, isError, isSuccess, message, navigate, dispatch
    ])

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('passwords do not match')
        } else if (password.length < 6) {
            toast('ensure password is more than 6 characters')
        } else if(!firstName || !lastName || !email ||! password || !accountType){
            toast.error('Please ensure all fields are filled')
        } else if (accountType !== "driver" && accountType !== "client") {
            toast.error("please select either 'client' or 'driver'")
        } else {
            const userData = {
                firstName,
                lastName,
                accountType,
                email, 
                password
            }
            dispatch(register(userData))
        }
    }
    if(isLoading) {
        return <Spinner />
    }
  return (
    <>
    <Home />
        <section className='heading'>
            <h5>
                <FaUser /> Register
            </h5>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type='text'
                        name='firstName'
                        className='form-control'
                        id='firstName'
                        value={firstName}
                        placeholder='Enter your first name'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='text'
                        name='lastName'
                        className='form-control'
                        id='lastName'
                        value={lastName}
                        placeholder='Enter your last name'
                        onChange={onChange}
                    />
                    </div>
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
                    <input 
                        type='text'
                        name='password2'
                        className='form-control'
                        id='password2'
                        value={password2}
                        placeholder='Confirm password'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='text'
                        name='accountType'
                        className='form-control'
                        id='accountType'
                        value={accountType}
                        placeholder='register as a client or driver'
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn btn-block'>Register</button>
                </div>
                <div className="form-group">
                    <p>Already have an account? <a href="/login">Login</a> </p>
                </div>
            </form>
        </section>
        
    </>
  )
}

export default Register
