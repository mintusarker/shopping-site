import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaArrowAltCircleLeft,
  FaBuyNLarge,
  FaCartPlus,
  FaListAlt,
  FaStore,
} from "react-icons/fa";
import Navbar from "../component/share/Navbar";
import Footer from "../component/share/Footer";
import { FaShop } from "react-icons/fa6";
import { AuthContext } from "../auth/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center px-16 pt-5">
          {/* outlet */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu w-auto p-8 min-h-screen bg-[#dbab4d] text-base-content flex items-center flex-col">
            {/* Sidebar content here */}
            <div className="text-lg my-4">

              
              <div className="lg:mt-0 md:mt-0 mt-14">
                {user?.email ? (
                  <p className="text-[#FFFFFF] uppercase text-sm font-semibold text-center shadow-md opacity-70 rounded-full shadow-white">
                    <span className="text-rose-900">user</span> Dashboard
                  </p>
                ) : user?.admin ? (
                  <p className="text-[#FFFFFF] uppercase text-sm font-semibold text-center shadow-md opacity-70 rounded-full shadow-white">
                    <span className="text-rose-900">Admin</span> Dashboard
                  </p>
                ) : (
                  navigate("/login")
                )}
              </div>

              <li className="text-slate-800 uppercase text-sm font-bold leading-6 mt-12 mb-3 border-b border-b-white text-center">
                Products
              </li>

              <li className="rounded-md text-base text-white">
                <Link
                  className="flex items-center gap-2"
                  to="/dashboard/all_product"
                >
                  <FaListAlt></FaListAlt>
                  All Products
                </Link>
              </li>

              <li className="text-white text-base mt-1 rounded-md">
                <Link
                  className="flex items-center gap-2"
                  to="/dashboard/all_product"
                >
                  <FaBuyNLarge></FaBuyNLarge>
                  Buy Product
                </Link>
              </li>

              <li className="text-slate-800 uppercase text-sm font-bold leading-6 mt-12 mb-3 border-b border-b-white text-center">
                Manage
              </li>
              {/* <li className="text-white rounded-md">
                <Link
                  className="flex items-center gap-2"
                  to="/dashboard/all_orders"
                >
                  <FaList></FaList>
                  All Orders
                </Link>
              </li> */}

              <li className="text-base text-white rounded-md">
                <Link
                  className="flex items-center gap-2"
                  to="/dashboard/my_bookings"
                >
                  <FaCartPlus></FaCartPlus>
                  My Bookings
                </Link>
              </li>

              <li className="text-white text-base mt-1 rounded-md">
                <Link
                  className="flex items-center gap-2"
                  to="/dashboard/my_products"
                >
                  <FaStore></FaStore>
                  Manage Product
                </Link>
              </li>

              <li className="text-white text-base mt-1 rounded-md">
                <Link
                  className="flex items-center gap-2"
                  to="/dashboard/add_product"
                >
                  <FaShop></FaShop>
                  Add Product
                </Link>
              </li>

              <li className="text-white text-base mt-14 rounded-md">
                <Link className="flex items-center gap-2" to="/">
                  <FaArrowAltCircleLeft></FaArrowAltCircleLeft>
                  Home
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
