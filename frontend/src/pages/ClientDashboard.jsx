import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import PackageForm from '../components/PackageForm'
import PackageDisplay from '../components/PackageDisplay'
import { toast } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function ClientDashboard() {
  const navigate = useNavigate()
  const {user, isError, message, isSuccess} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
    if(isError) {
      toast('error occured')
    }
  }, [user, isError, message, isSuccess, navigate])
  return (
    <>
      <section className='heading'>
        <h3>welcome {user ? user.name : 'Guest'}</h3>
        <p>Package Dashboard</p>
      </section>
      <section className='main-section'>
        <Routes>
          <Route path='/createpackage' element={<PackageForm />} />
          <Route path='/packages' element={<PackageDisplay />} />
        </Routes>
      </section>
      
    </>
  )
}

export default ClientDashboard