import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import UserProfileModal from "../../user/profile/UserProfileModal";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [modal, setModal] = useState(false);

  const [profile, setProfile] = useState(true);
  // console.log(profile);

  //pop up user info modal handler
  const modalHandler = () => {
    setModal(true);
    setProfile(false);
  };

  const modalHandlerOff = () => {
    setModal(false);
    setProfile(true);
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/shop">Shop</Link>
      </li>

      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>

      <li>
        <Link to="/sign_up">SignUp</Link>
      </li>

      {user?.uid ? (
        <li>
          {profile ? (
            <button onClick={() => modalHandler()} className="btn btn-sm">
              Profile
            </button>
          ) : !profile ? (
            <button onClick={() => modalHandlerOff()} className="btn btn-sm">
              Profile
            </button>
          ) : (
            ""
          )}
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div>
      <div className="navbar relative lg:px-10 md:px-6 mx-auto bg-gradient-to-t to-gray-600 from-blue-900 text-white justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-10 mt-3 p-2 shadow bg-black rounded-box w-52 capitalize"
            >
              {menuItems}
            </ul>
          </div>
          <p className="font-semibold text-xl">Fashion Corner</p>
        </div>
        <div className="navbar-center hidden md:flex lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-base capitalize items-center">
            {menuItems}
          </ul>
        </div>
        <label
          htmlFor="my-drawer-2"
          tabIndex={0}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>

      {modal && (
        <UserProfileModal
          setModal={setModal}
          setProfile={setProfile}
        ></UserProfileModal>
      )}
    </div>
  );
};

export default Navbar;
