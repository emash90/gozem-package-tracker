import {useState, useEffect } from'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@material-ui/core/Button';
import { deleteDelivery, getDeliveries, reset } from '../features/Delivery/deliverySlice'


function DeliveryDisplay() {
    function createData(pickup_time, start_time, end_time, locationLatitude, locationLongitude, status, deleteDelivery) {
    return { pickup_time, start_time, end_time, locationLatitude, locationLongitude, status, deleteDelivery };
    }
    const rows = []
    const [tableData, setTableData] =useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const {deliveries, isError, isLoading, isSuccess, message} = useSelector((state) => state.deliveries)
    useEffect(() => {
      if(isError) {
        console.log(message);
      }
      if(!user) {
        navigate('/login')
      }
      dispatch(getDeliveries())
      setTableData(deliveries)
      return () => {
        dispatch(reset())
      }
    }, [user])
    
    
    const handleDelete = async(id) => {
      if(window.confirm("are you sure you want to delete the package?")){
      
      await dispatch(deleteDelivery(id))

      dispatch(getDeliveries())}
    }
    const handleDetails = async (id) => {
      await navigate(`/driver/delivery/${id}`)
    }
    const handleClick = async (id) => {
      await navigate(`/driver/package/${id}`)
    }
    if(isLoading) {
        return <Spinner />
    }
  return (
    <TableContainer component={Paper}>
     <Table aria-label="simple table" stickyHeader>
       <TableHead>
         <TableRow>
           <TableCell align="left">Delivery for packageId</TableCell>
           <TableCell>Delivery Pick_up Time</TableCell>
           <TableCell align="right">Delivery Start Time</TableCell>
           <TableCell align="right">Delivery End Time</TableCell>
           <TableCell align="center">Status</TableCell>
           <TableCell align="center">package details</TableCell>
           <TableCell align="center">delete package</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>     
         {deliveries.length > 0 ? (
           deliveries.map((delivery) => (
             <TableRow key={delivery._id}>
               <TableCell component="th" scope="row" onClick={() => {handleClick(delivery.packageId)}} >{delivery.packageId}              
               </TableCell>
               <TableCell align="center" component="th" scope="row">
                 {new Date(delivery.pickup_time).toLocaleDateString()}
               </TableCell>
               <TableCell align="center">{new Date(delivery.start_time).toLocaleDateString()}</TableCell>
               <TableCell align="center">{new Date(delivery.end_time).toLocaleDateString()}</TableCell>
               <TableCell align="center"><Button variant='contained'>{delivery.status}</Button></TableCell>
               <TableCell align="center"><Button variant="outlined" 
               onClick={() => {handleDetails(delivery._id)}}
               >
                 Details</Button></TableCell>
               <TableCell align="center"><Button variant="outlined" startIcon={<DeleteIcon />}
               onClick={()=> {handleDelete(delivery._id)}}
               >Delete</Button></TableCell>
             </TableRow>
           ))
           ) : (
             <h1>You do not any deliveries at the moment. Got to <a href="">available</a> </h1>
           )
          }     
       </TableBody>
     </Table>
   </TableContainer>
  )
}

export default DeliveryDisplay