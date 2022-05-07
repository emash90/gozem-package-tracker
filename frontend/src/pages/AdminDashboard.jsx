import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import PackageForm from '../components/PackageForm'
import PackageDisplay from '../components/PackageDisplay'
import { toast } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PackageDetails from '../components/PackageDetails'
import AdminHeader from '../components/AdminHeader'
import Users from '../components/Users'
import Deliveries from '../components/Deliveries'
import Packages from '../components/Packages'
import Reports from '../components/Reports'


function AdminDashboard() {
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
    <AdminHeader />
      <section className='heading'>
        <h3>welcome {user ? user.name : 'Guest'}</h3>
        <p>Admin Dashboard</p>
      </section>
      <section className='main-section'>
        <Routes>
          <Route path='/allpackages' element={<Packages />} />
          <Route path='/alldeliveries' element={<Deliveries />} />
          <Route path='/allusers' element={<Users />} />
          <Route path='/Reports' element={<Reports />} />
        </Routes>
      </section>
      
    </>
  )
}

export default AdminDashboard