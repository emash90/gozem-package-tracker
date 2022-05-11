import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPackages} from '../features/packages/packageSlice'
import { getAllDeliveries } from '../features/Delivery/deliverySlice'
import { getAllUsers } from '../features/auth/authSlice'


function Reports() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allUsers, user } = useSelector((state) => state.auth)
  const { allDeliveries } = useSelector((state) => state.deliveries)
  const { packages } = useSelector((state) => state.packages)
  const [packageData, setPackageData] = useState([])
  const [deliveryData, setDeliveryData] = useState([])
  const [userData, setUserData] = useState([])
  useEffect(() => {
    // if(isError) {
    //   console.log(message);
    // }
    if(!user) {
      navigate('/login')
    }
    dispatch(getAllPackages())
    setPackageData(packages)
    dispatch(getAllDeliveries())
    setDeliveryData(allDeliveries)
    dispatch(getAllUsers())
    setUserData(allUsers)
    // return () => {
    //   dispatch(reset())
    // }
  }, [user])
 
  // if(isLoading) {
  //     return <Spinner />
  // }


  return (
    <div className='reports'>
      <div className="package-reports">
        <h3>all packages: <span>{packages.length} </span></h3>
        <p>closed packages: <span>{packages.length} </span></p>
        <p>Intransit packages: <span>{packages.length} </span></p>
        <p className='failed'>failed packages: <span>{packages.length} </span></p>
      </div>
      <div className="delivery-reports">
        <h3>All Deliveries: <span>{allDeliveries.length} </span> </h3>
        <p>Closed Deliveries: <span>{allDeliveries.length} </span></p>
        <p>Intransit Deliveries: <span>{allDeliveries.length} </span></p>
        <p className='failed'>Failed Deliveries: <span>{allDeliveries.length} </span></p>
      </div>
      <div className="user-reports">
        <h3>all users: <span>{allUsers.length} </span></h3>
        <p>Admin: <span>{allUsers.length} </span></p>
        <p>Clients: <span>{allUsers.length} </span></p>
        <p>Drivers: <span>{allUsers.length} </span></p>
      </div>
    </div>
  )
}

export default Reports