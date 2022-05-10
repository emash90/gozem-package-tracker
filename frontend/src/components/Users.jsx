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
import {getAllUsers, reset} from '../features/auth/authSlice'


import Button from '@material-ui/core/Button';

function Users() {
    function createData(firstName, lastName, userType, email) {
    return { firstName, lastName, userType, email };
    }
    const rows = []
    const [tableData, setTableData] =useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

   
    const {allUsers, user, isError, isLoading, isSuccess, message, reset} = useSelector((state) => state.auth)
    useEffect(() => {
      if(isError) {
        console.log(message);
      }
      if(!user) {
        navigate('/login')
      }
      dispatch(getAllUsers())
      setTableData(allUsers)

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
           <TableCell>User Id</TableCell>
           <TableCell align="center">First Name</TableCell>
           <TableCell align="center">Last Name</TableCell>
           <TableCell align="center">Email</TableCell>
           <TableCell align="center">User Account Type</TableCell>
           <TableCell align="center">Created At</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>     
         {allUsers.length > 0 ? (
           allUsers.map((allUser) => (
             <TableRow key={allUser._id}>
               <TableCell component="th" scope="row">{allUser._id}</TableCell>
               <TableCell component="th" scope="row">{allUser.firstName}</TableCell>
               <TableCell align="center">{allUser.lastName}</TableCell>
               <TableCell align="center">{allUser.email}</TableCell>
               <TableCell align="center">{allUser.accountType}</TableCell>
               <TableCell align="center">{new Date(allUser.createdAt).toLocaleDateString()}</TableCell>
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

export default Users