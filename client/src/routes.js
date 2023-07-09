
import App from './App';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import CheckAuth from './utils/CheckAuth';
import {createBrowserRouter} from 'react-router-dom';
import CheckGuest from './utils/CheckGuest';
import BlogPage from './pages/BlogPage';
import Blog from './pages/Blog';
import ViewBlog from './pages/ViewBlog';
export default createBrowserRouter([
    {
      element : <App />,
      children : [
        {
          path : "/login",
          element : (
            <CheckGuest>
              <LogIn />
            </CheckGuest>
            )
        },
        {
          path : "/register",
          element : (
            <CheckGuest>
              <Register />
            </CheckGuest>
            )
            
        },
        {
          path : "/",
          element : (
          <CheckAuth>
            <Home />
          </CheckAuth>
          )
        },
        {
          path : "/blog",
          element : (
          <CheckAuth>
            <Blog />
          </CheckAuth>
          )
        },
        {
          path : "/newblog",
          element : (
            <CheckAuth>
              <BlogPage />
            </CheckAuth>
            )
            
        } ,
        {
          path : "/showBlog",
          element : (
            <CheckAuth>
              <ViewBlog />
            </CheckAuth>
            )
            
        }
      ]
    },
    
    ]);