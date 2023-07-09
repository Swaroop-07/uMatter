import React, { useEffect } from 'react';
import AppBar from '../src/components/AppBar.js'
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getUser} from './store/authStore.js';
import { QueryClient, QueryClientProvider} from 'react-query'
const App = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token")
  const id = Cookies.get("id");
  const queryClient = new QueryClient();
  const fetchUser = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, 
    {
        headers :
        {
            Authorization : `Bearer ${token}` 
        }
    }
    );
    if(res.ok)
    {
      const user = await res.json();
      dispatch(getUser(user));
    }
}
  useEffect(() => {
      fetchUser();
  },[])
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AppBar /> */}
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
