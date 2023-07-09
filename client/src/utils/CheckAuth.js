
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const CheckAuth = ({children}) => {
    const auth = useSelector((state) => state?.auth);
    return auth.isAuthenticated ? children : <Navigate to="/login" replace={false}/>;
}

export default CheckAuth;