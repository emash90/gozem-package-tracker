import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useState, useEfect } from 'react'

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    })
    const { firstName, lastName, email, password, password2 } = formData
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
                <FaUser /> Register
            </h5>
            <p>Please create an account</p>
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
                    <button type='submit' className='btn btn-block'>Register</button>
                </div>
            </form>
        </section>
        
    </>
  )
}

export default Register
