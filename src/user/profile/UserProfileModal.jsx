import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { FaXmark } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import { Link } from "react-router-dom";

const UserProfileModal = ({ setModal, setProfile }) => {
  const { user, logOut } = useContext(AuthContext);

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
    <div className="flex flex-col gap-3 absolute z-50 right-0 border-2 h-auto w-auto shadow-md p-14 rounded-md bg-slate-400">
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

      <div className="mt-11 flex flex-row-reverse items-center justify-between">
        <Link className="flex justify-center items-center text-sm gap-1">
          <SlSettings></SlSettings> Setting
        </Link>
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
