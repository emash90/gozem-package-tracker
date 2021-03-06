import {useState, useEffect } from'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { getPackages, reset, getAllPackages} from '../features/packages/packageSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePackage } from '../features/packages/packageSlice'
import PackageDetails from './PackageDetails'
import Button from '@material-ui/core/Button';


function Packages() {
    function createData(description, from_name, to_name, createdAt, packageDetails, deletePackage) {
    return { description, from_name, to_name, createdAt, packageDetails };
    }
    const rows = []
    const [tableData, setTableData] =useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const {packages, isError, isLoading, isSuccess, message} = useSelector((state) => state.packages)
    useEffect(() => {
      if(isError) {
        console.log(message);
      }
      if(!user) {
        navigate('/login')
      }
      dispatch(getAllPackages())
      console.log(packages);
      setTableData(packages)
     

      return () => {
        dispatch(reset())
      }
    }, [user])
    const handleDetails = async (id) => {
      await navigate(`/driver/package/${id}`) 
    }
    if(isLoading) {
        return <Spinner />
    }
    return (
    <TableContainer component={Paper} style={{

      border: 'solid 3px grey',
      marginRight: '20px'
    }}>
     <Table aria-label="simple table" stickyHeader>
       <TableHead style={{
         color: 'red'
       }} >
         <TableRow>
           <TableCell>#</TableCell>
           <TableCell>package description</TableCell>
           <TableCell align="right">package from_name</TableCell>
           <TableCell align="right">package to_name</TableCell>
           <TableCell align="right">package createdAt</TableCell>
           <TableCell align="right">package creator</TableCell>
           <TableCell align="right">package details</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>     
         {packages.length > 0 ? (
           packages.map((pack) => (
             <TableRow key={pack._id}>
                <TableCell component="th" scope="row">{}</TableCell>
               <TableCell component="th" scope="row">{pack.description}</TableCell>
               <TableCell align="right">{pack.from_name}</TableCell>
               <TableCell align="right">{pack.to_name}</TableCell>
               <TableCell align="right">{new Date(pack.createdAt).toLocaleDateString()}</TableCell>
               <TableCell align="right">{pack.packageCreator}</TableCell>
               <TableCell align="right"><Button variant="outlined" 
               onClick={() => {handleDetails(pack._id)}}
               >
                 Details</Button></TableCell>
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

export default Packages