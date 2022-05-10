import {useState, useEffect } from'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { getAllDeliveries, reset } from '../features/Delivery/deliverySlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePackage } from '../features/packages/packageSlice'
import PackageDetails from './PackageDetails'

import Button from '@material-ui/core/Button';

function Deliveries() {
    function createData(deliveryId, deliveryFor, startTime, endTime, driverDelivering, deliveryStatus) {
    return { deliveryId, deliveryFor, startTime, endTime, driverDelivering, deliveryStatus };
    }
    const rows = []
    const [tableData, setTableData] =useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const {allDeliveries, isError, isLoading, isSuccess, message} = useSelector((state) => state.deliveries)
    useEffect(() => {
      if(isError) {
        console.log(message);
      }
      if(!user) {
        navigate('/login')
      }
      dispatch(getAllDeliveries())
      console.log(allDeliveries);
      setTableData(allDeliveries)
      // return () => {
      //   dispatch(reset())
      // }
    }, [user])
    // const handleDetails = async (id) => {
    //   await navigate(`/driver/package/${id}`) 
    // }
    if(isLoading) {
        return <Spinner />
    }
  return (
    <TableContainer component={Paper}>
     <Table aria-label="simple table" stickyHeader>
       <TableHead>
         <TableRow>
           <TableCell align="center">Delivery Id</TableCell>
           <TableCell align="center">Delivery For</TableCell>
           <TableCell>Delivery Start-time</TableCell>
           <TableCell align="center">Delivery End-time</TableCell>
           <TableCell align="center">Driver Delivering</TableCell>
           <TableCell align="center">Delivery Status</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>     
         {allDeliveries.length > 0 ? (
           allDeliveries.map((allDelivery) => (
             <TableRow key={allDelivery._id}>
               <TableCell component="th" scope="row">
                 {allDelivery._id}
               </TableCell>
               <TableCell align="center">{allDelivery.packageId}</TableCell>
               <TableCell align="center">{new Date(allDelivery.start_time).toLocaleDateString()}</TableCell>
               <TableCell align="center">{new Date(allDelivery.end_time).toLocaleDateString()}</TableCell>
               <TableCell align="center">{allDelivery.user_id}</TableCell>
               <TableCell align="center"><Button variant="contained" >{allDelivery.status}</Button></TableCell>
             </TableRow>
           ))
           ) : (
             <h1>No available packages at the moment</h1>
           )
          }     
       </TableBody>
     </Table>
   </TableContainer>
  )
}

export default Deliveries