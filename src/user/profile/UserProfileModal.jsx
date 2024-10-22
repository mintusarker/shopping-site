import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { FaXmark } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import toast from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";

const UserProfileModal = ({ setModal, setProfile }) => {
  const { user, logOut, deleteUserInfo } = useContext(AuthContext);

  const [isAdmin, setAdmin] = useAdmin(user?.email);

  //user logout
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
    setModal(false);
  };

  //user own account delete
  const userDeleteHandler = () => {
    deleteUserInfo()
      .then(() => {})
      .catch((err) => console.log(err));
    // UserDelete();
    setModal(false);
  };

  // //user deleted from database
  // const UserDelete = (_id) => {
  //   const data = users.map((u) => console.log(u));
  //   fetch(`https://user-dashboard-server-five.vercel.app/user/${_id}`, {
  //     method: "DELETE",
  //     headers: {
  //       content: "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       res.json();
  //       console.log(res);
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       toast.success(`User deleted successfully`);
  //     });
  // };

  const modalOff = () => {
    setModal(false);
    setProfile(true);
  };
  console.log(user);

  return (
    <div className="flex flex-col gap-3 absolute z-50 right-0 border-2 h-auto w-auto shadow-sm p-14 rounded-sm bg-slate-400">
      <button
        onClick={modalOff}
        className="absolute top-1 right-1 text-xl bg-white rounded-full "
      >
        <FaXmark></FaXmark>
      </button>

      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src={user?.photoURL} />
        </div>
      </div>
      <div className="text-sm">Name : {user?.displayName}</div>
      <div className="text-sm">Email : {user?.email}</div>

      <div className="mt-11 gap-8 flex flex-row-reverse items-center justify-between">
        <div className="dropdown dropdown-hover dropdown-top">
          <button
            tabIndex={0}
            role="button"
            className="flex dropdown justify-center items-center text-sm gap-1"
          >
            <SlSettings></SlSettings> Setting
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-md flex flex-col -right-14 w-[150px] bg-base-100 z-[1] shadow"
          >
            {isAdmin ? (
              <li className="ml-4 font-semibold text-red-500">Admin Account</li>
            ) : (
              <li>
                <button onClick={userDeleteHandler} className="text-red-500">
                  Delete Account
                </button>
              </li>
            )}
            {/* <li>
              <button className="text-green-500">Change Email</button>
            </li> */}
          </ul>
        </div>
        <button
          className="btn btn-xs bg-slate-800 text-white rounded-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileModal;


