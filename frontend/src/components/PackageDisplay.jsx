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
import { makeStyles } from '@mui/styles'
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        margin: '10px 10px',
        maxWidth: 950,
    },

}))


function PackageDisplay() {
    function createData(description, from_name, to_name, createdAt) {
    return { description, from_name, to_name, createdAt };
    }
    const rows = []
    const [tableData, setTableData] =useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const {packages, isError, isLoading, isSuccess, message} = useSelector((state) => state.packages)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
       if(isError) {
           console.log(message);
       }
        dispatch(getPackages())
       
        return () => {
            dispatch(reset())
        }
        
        
        
    }, [navigate, isError, message, user])
    
    if(isLoading) {
        return <Spinner />
    }
  return (
    <TableContainer component={Paper}>
     <Table aria-label="simple table" stickyHeader>
       <TableHead>
         <TableRow>
           <TableCell>package description</TableCell>
           <TableCell align="right">package from_name</TableCell>
           <TableCell align="right">package to_name</TableCell>
           <TableCell align="right">package createdAt</TableCell>
           <TableCell align="right">package details</TableCell>
           <TableCell align="right">delete package</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {packages.map((pack) => (
           <TableRow key={pack._id}>
             <TableCell component="th" scope="row">
               {pack.description}
             </TableCell>
             <TableCell align="right">{pack.from_name}</TableCell>
             <TableCell align="right">{pack.to_name}</TableCell>
             <TableCell align="right">{new Date(pack.createdAt).toLocaleDateString()}</TableCell>
             <TableCell align="right"><button>details</button></TableCell>
             <TableCell align="right"><button>delete</button></TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
  )
}

export default PackageDisplay