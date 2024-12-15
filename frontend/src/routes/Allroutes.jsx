import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import UserSignup from '../pages/UserSignup'
import CaptainLogin from '../pages/CaptainLogin'
import CaptainSignup from '../pages/CaptainSignup'
import UserLogin from '../pages/UserLogin'


const router = createBrowserRouter([
{
  path:'/',
  element:<Home/>
},
{
  path:'/login',
  element:<UserLogin/>
},
{
  path:'/signup',
  element:<UserSignup/>
},
{
  path:'/captain-login',
  element:<CaptainLogin/>
},
{
  path:'/captain-signup',
  element:<CaptainSignup/>
},

])

const Allroutes = () => {
  return  <RouterProvider router={router} />
}

export default Allroutes;
