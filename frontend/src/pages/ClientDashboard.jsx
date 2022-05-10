import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import PackageForm from '../components/PackageForm'
import PackageDisplay from '../components/PackageDisplay'
import { toast } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PackageDetails from '../components/PackageDetails'
import ClientHeader from '../components/ClientHeader'
import PackageFilter from '../components/PackageFilter'



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
    <ClientHeader />
    <PackageFilter />
      <section className='main-section'>
        <Routes>
          <Route path='/createpackage' element={<PackageForm />} />
          <Route path='/packages' element={<PackageDisplay />} />
          <Route path='/package/:id' element={<PackageDetails />} />
        </Routes>
      </section>  
    </>
  )
}

export default ClientDashboard