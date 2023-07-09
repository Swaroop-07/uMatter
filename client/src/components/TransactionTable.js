import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
export default function TransactionTable({fetchTransaction, data, setEditTransaction}) {
    const token = Cookies.get('token');
    const remove = async(_id) => {
        if(!window.confirm("Are you Sure")) return;
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${_id}`, {
            method: "DELETE",
            headers : {
                'content-type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        })
        if(res.ok)
        {
            window.alert("Delete Succesfully");
            fetchTransaction();
        }
        
    }
    const formatDate = (date) => {
        return dayjs(date).format('DD MMM, YYYY')
    }
  return (
    <Container  sx={{marginLeft: '17%;'}}>
        <Typography variant="h5" >
            List of Transactions
        </Typography>
        <TableContainer sx={{ marginTop : 2 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center">Transaction Description</TableCell>
                <TableCell align="center">Transaction Amount</TableCell>
                <TableCell align="center">Transaction Date</TableCell>
                <TableCell align="center">Modify Transaction</TableCell>
                <TableCell align="center">Delete Transaction</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data?.map((row) => (
                <TableRow key={row._id} >
                <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                    <IconButton aria-label="delete" color="primary" onClick={() => setEditTransaction(row)}>
                        <EditRoundedIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <IconButton aria-label="delete" color="warning" onClick={() => remove(row._id)}>
                        <DeleteRoundedIcon />
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Container>
  );
}