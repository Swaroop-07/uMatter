import React from 'react';
import Cookies from 'js-cookie';
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
const CheckGuest = ({children}) => {
    const auth = useSelector((state) => state?.auth);
    return !auth.isAuthenticated ? children : <Navigate to="/" replace={false} />;
}

export default CheckGuest;