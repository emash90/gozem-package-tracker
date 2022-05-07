import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import PackageForm from '../components/PackageForm'
import PackageDisplay from '../components/PackageDisplay'
import { toast } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PackageDetails from '../components/PackageDetails'
import ClientHeader from '../components/ClientHeader'
import DeliveryForm from '../components/DeliveryForm'
import DeliveryDisplay from '../components/DeliveryDisplay'
import DeliveryDetails from '../components/DeliveryDetails'
import DriverHeader from '../components/DriverHeader'


function DriverDashboard() {
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
    <DriverHeader />
      <section className='heading'>
        <h3>welcome {user ? user.name : 'Guest'}</h3>
        <p>Delivery Dashboard</p>
      </section>
      <section className='main-section'>
        <Routes>
          <Route path='/createdelivery' element={<DeliveryForm />} />
          <Route path='/deliveries' element={<DeliveryDisplay />} />
          <Route path='/delivery/:id' element={<DeliveryDetails />} />
        </Routes>
      </section>
      
    </>
  )
}

export default DriverDashboard