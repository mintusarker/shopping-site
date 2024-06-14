import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBuyNLarge, FaCartPlus, FaStore } from "react-icons/fa";
import Navbar from "../component/share/Navbar";
import Footer from "../component/share/Footer";
import { FaShop } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer md:drawer-open lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* outlet */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu w-auto p-8 text-center min-h-screen bg-[#ebae34] text-base-content flex items-center flex-col">
            {/* Sidebar content here */}
            <div className="text-lg my-4">
             <li className="text-[#FFFFFF] text-xl shadow-md bg-slate-600 rounded-full shadow-white"> Dashboard</li>
              
              <li className="text-white mt-8 rounded-md">
                <Link
                  className="flex items-center gap-2"
                   to="/dashboard/all_product"
                >
                  <FaBuyNLarge></FaBuyNLarge>
                  Buy Product
                </Link>
              </li>

              <li className="text-center text-white my-6 rounded-md">
                <Link
                  className="flex items-center gap-2"
                 to='/dashboard/my_bookings'
                >
                  <FaCartPlus></FaCartPlus>
                  My Bookings
                </Link>
              </li>

              <li className="text-white rounded-md">
                <Link
                  className="flex items-center gap-2"
                   to="/dashboard/my_products"
                >
                  <FaStore></FaStore>
                  Manage Product
                </Link>
              </li>
              <li className="text-white mt-6 rounded-md">
                <Link
                  className="flex items-center gap-2"
                  to="/dashboard/add_product"
                >
                  <FaShop></FaShop>
                  Add Product
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default Dashboard;
