//import * as React from 'react';
import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Container } from '@mui/system';
import Cookies from 'js-cookie';
const initialForm = {
    amount : 0,
    name : "",
    date : new Date()
  }
export default function TransactionForm({fetchTransaction, editTransaction}) {
const [form, setForm] = useState(initialForm);
const token = Cookies.get('token');
useEffect(() => {
    if(editTransaction.amount != undefined)
    {
        setForm(editTransaction);
    }
},[editTransaction])


const handleInput = (e) => {
    setForm({...form, [e.target.name] : e.target.value});
  }

const handleDate = (newValue) => {
    setForm({...form, date : newValue});
  }

const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editTransaction.amount === undefined ? create() : update();
  }

const create = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers :
      {
        'content-type' : 'application/json',
         Authorization : `Bearer ${token}`
      },
      method : 'POST',
      body : JSON.stringify(form)
    });
    reload(res);
}

const update = async(_id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, {
      headers :
      {
        'content-type' : 'application/json',
         Authorization : `Bearer ${token}`
      },
      method : 'PATCH',
      body : JSON.stringify(form)
    });
    reload(res);
}

const reload = (res) =>
{
    if(res.ok)
    {
        setForm(initialForm);
        fetchTransaction();
    }

}


  return (
    <Container sx={{marginLeft: '17%;'}}>
        <Typography variant="h5" sx={{ marginTop : 5 }}>
            Add New Transaction
        </Typography>
        <Card sx={{ minWidth: 275, marginTop : 2}}>
        <CardContent>
            <form onSubmit={handleSubmit}>
                    <TextField sx={{paddingRight : 5}} type="string" id="standard-basic" name="name" size="small" label="Description" variant="standard" value={form.name} onChange={handleInput}/>
                    <TextField sx={{paddingRight : 5}} type="number" id="standard-basic" name="amount" size="small" label="Amount" variant="standard" value={form.amount} onChange={handleInput}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                        inputFormat="DD/MM/YYYY"
                        value={form.date} 
                        name="date"
                        onChange={handleDate}
                        renderInput={(params) => <TextField {...params} sx={{paddingRight : 5}} size="small"  id="standard-basic" label="Transaction Date" variant="standard" />}
                        />
                    </LocalizationProvider>

                <Button x={{paddingTop : 3}} type="submit" variant="contained">{editTransaction.name != undefined ? "Update" : "Submit"}</Button>
            </form>
            
        </CardContent>

        </Card>
    </Container>
  );
}
