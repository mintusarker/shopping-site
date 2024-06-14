import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import UserDashboard from "../component/dashboard/UserDashboard";
import Login from "../component/login/Login";
import SignUp from "../component/signup/SignUp";
import Main from "../layout/Main";
import AddProduct from "../component/dashboard/AddProduct";
import MyProducts from "../component/dashboard/myProduct/MyProducts";
import UpdateProduct from "../component/dashboard/update/UpdateProduct";
import AllProducts from "../component/dashboard/AllProducts/AllProducts";
import BookingPage from "../component/Booking/BookingPage";
import MyOrders from "../component/dashboard/MyOrder/MyOrders";
import Payment from "../component/payment/Payment";
import PrivateRoute from "./PrivateRoutes";
import Home from "../component/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign_up",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/dashboard/add_product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/my_products",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/all_product",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/dashboard/booking_product/:id",
        element: <BookingPage></BookingPage>,
        loader: ({ params }) =>
          fetch(
            ` https://user-dashboard-server-five.vercel.app/products/${params?.id}`
          ),
      },
      {
        path: "/dashboard/my_bookings",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/update-product/:id",
        element: <UpdateProduct></UpdateProduct>,
        loader: ({ params }) =>
          fetch(
            ` https://user-dashboard-server-five.vercel.app/products/${params?.id}`
          ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://user-dashboard-server-five.vercel.app/bookings/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
