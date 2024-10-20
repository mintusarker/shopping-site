import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Main";
import AddProduct from "../component/dashboard/AddProduct";
import UpdateProduct from "../component/dashboard/update/UpdateProduct";
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
import NewArrivalProductsList from "../component/dashboard/NewArrivalList/NewArrivalProductsList";
import TopSellingProductsList from "../component/dashboard/TopSellingList/TopSellingProductsList";
import NewArrivalBooking from "../component/Booking/NewArrivalBooking";
import TopSellingProductBooking from "../component/Booking/TopSellingProductBooking";
import DashboardHome from "../component/dashboard/DashboardHome";

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
          fetch(
            ` user-dashboard-server-five.vercel.app/products/${params?.id}`
          ),
      },
      {
        path: "/new_arrival/:id",
        element: <NewArrivalBooking></NewArrivalBooking>,
        loader: ({ params }) =>
          fetch(
            ` user-dashboard-server-five.vercel.app/newArrival/${params?.id}`
          ),
      },
      {
        path: "/top_selling/:id",
        element: <TopSellingProductBooking></TopSellingProductBooking>,
        loader: ({ params }) =>
          fetch(
            ` user-dashboard-server-five.vercel.app/topSelling/${params?.id}`
          ),
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
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/add_product",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/dashboard/manage_products",
        element: <StoreProducts></StoreProducts>,
      },
      // {
      //   path: "/dashboard/all_product",
      //   element: <AllProducts></AllProducts>,
      // },
      {
        path: "/dashboard/new_arrival",
        element: <NewArrivalProductsList></NewArrivalProductsList>,
      },
      {
        path: "/dashboard/top_selling",
        element: <TopSellingProductsList></TopSellingProductsList>,
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
          fetch(
            ` user-dashboard-server-five.vercel.app/products/${params?.id}`
          ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`user-dashboard-server-five.vercel.app/bookings/${params.id}`),
      },
      {
        path: "/dashboard/users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

export default router;
