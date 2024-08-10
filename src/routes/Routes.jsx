import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import UserDashboard from "../component/dashboard/UserDashboard";
import Main from "../layout/Main";
import AddProduct from "../component/dashboard/AddProduct";
import UpdateProduct from "../component/dashboard/update/UpdateProduct";
import AllProducts from "../component/dashboard/BuyProducts/AllProducts";
import BookingPage from "../component/Booking/BookingPage";
import Payment from "../component/payment/Payment";
import PrivateRoute from "./PrivateRoutes";
import Home from "../component/home/Home";
import Shopping from "../component/shop/Shopping";
import Login from "../user/login/Login";
import SignUp from "../user/signup/SignUp";
import MyOrders from "../component/Booking/MyOrder/MyOrders";
import AllOrders from "../component/dashboard/AllOrders/AllOrders";
import AllUsers from "../component/dashboard/AllUsers/AllUsers";
import StoreProducts from "../component/dashboard/ManageProducts/StoreProducts";

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
        path: "/shop",
        element: <Shopping></Shopping>,
      },
      {
        path: "/booking_product/:id",
        element: <BookingPage></BookingPage>,
        loader: ({ params }) =>
          fetch(` http://localhost:5000/products/${params?.id}`),
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
        path: "/dashboard/manage_products",
        element: <StoreProducts></StoreProducts>
      },
      {
        path: "/dashboard/all_product",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/dashboard/my_bookings",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/all_orders",
        element: <AllOrders></AllOrders>,
      },
      {
        path: "/dashboard/update-product/:id",
        element: <UpdateProduct></UpdateProduct>,
        loader: ({ params }) =>
          fetch(` http://localhost:5000/products/${params?.id}`),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
      {
        path: "/dashboard/users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

export default router;
