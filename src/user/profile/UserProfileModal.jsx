import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { FaXmark } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import { Link } from "react-router-dom";

const UserProfileModal = ({ setModal, setProfile }) => {
  const { user, logOut,  deleteUserInfo } = useContext(AuthContext);
  console.log('user that are log in: And consol log only name',user);

  //user logout
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
    setModal(false);
  };

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
            className="dropdown-content menu rounded-md w-48 -left-6 bg-base-100 z-[1] shadow"
          >
            <li>
              <button onClick={deleteUserInfo} className="text-black">Delete Account</button>
            </li>
            <li>
              <button className="text-black">Change Email</button>
            </li>
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
