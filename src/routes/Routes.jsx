import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import UserDashboard from "../component/dashboard/UserDashboard";
import Login from "../component/login/Login";
import SignUp from "../component/signup/SignUp";
import Main from "../layout/Main";
import AddProduct from "../component/dashboard/AddProduct";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/sign_up',
            element: <SignUp></SignUp>
        },
      ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard',
                element: <UserDashboard></UserDashboard>
            },
            {
                path: '/dashboard/add_product',
                element: <AddProduct></AddProduct>
            }
        ]
    }
])


export default router;