import React from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'

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
    }
  return (
    <>
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
        </form>
    </section>
    
</>
  )
}

export default Login