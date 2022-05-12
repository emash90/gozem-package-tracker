import {useState, useEffect } from'react'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { getPackages, reset } from '../features/packages/packageSlice'
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

function PackageDisplay() {
    function createData(description, from_name, to_name, createdAt, status, packageDetails, deletePackage) {
    return { description, from_name, to_name, createdAt, status, packageDetails, deletePackage };
    }
    const rows = []
    const [tableData, setTableData] =useState([])
    const [status, setStatus] = useState('open')
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
      dispatch(getPackages())
      setTableData(packages)
      return () => {
        dispatch(reset())
      }
    }, [user])
    useEffect(() => {}, )
    const handleDelete = async(id) => {
      if(window.confirm("are you sure you want to delete the package?")){
      
      await dispatch(deletePackage(id))

      dispatch(getPackages())}
    }
    const handleDetails = async (id) => {
      await navigate(`/client/package/${id}`) 
    }
    if(isLoading) {
        return <Spinner />
    }
  return (
    <TableContainer component={Paper}>
     <Table aria-label="simple table" stickyHeader>
       <TableHead>
         <TableRow>
           <TableCell>#</TableCell>
           <TableCell>package description</TableCell>
           <TableCell align="right">package from_name</TableCell>
           <TableCell align="right">package to_name</TableCell>
           <TableCell align="right">package createdAt</TableCell>
           <TableCell align="right">package status</TableCell>
           <TableCell align="right">package details</TableCell>
           <TableCell align="right">delete package</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>     
         {packages.length > 0 ? (
           packages.map((pack) => (
             <TableRow key={pack._id}>
               <TableCell align="right">{}</TableCell>
               <TableCell component="th" scope="row">{pack.description}</TableCell>
               <TableCell align="right">{pack.from_name}</TableCell>
               <TableCell align="right">{pack.to_name}</TableCell>
               <TableCell align="right">{new Date(pack.createdAt).toLocaleDateString()}</TableCell>
               <TableCell align="right"> <Button variant='contained'>{pack.packageStatus}</Button></TableCell>
               <TableCell align="right"><Button variant="outlined" 
               onClick={() => {handleDetails(pack._id)}}>
                 Details</Button></TableCell>
               <TableCell align="right"><Button variant="outlined" startIcon={<DeleteIcon />}
               onClick={()=> {handleDelete(pack._id)}}
               >Delete</Button></TableCell>
             </TableRow>
           ))
           ) : (
             <h1>You do not have any packages at the moment </h1>
           )
          }     
       </TableBody>
     </Table>
   </TableContainer>
  )
}

export default PackageDisplay