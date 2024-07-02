import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { FaXmark } from "react-icons/fa6";


const UserProfileModal = ({setModal, setProfile}) => {
  const { user, logOut } = useContext(AuthContext);


  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
      setModal(false)
  };

  const modalOff = () => {
       setModal(false)
       setProfile(true)
  }



  console.log(user);
  return (
    <div className="flex flex-col gap-3 absolute z-50 right-0 border-2 h-auto w-auto shadow-md p-14 rounded-md bg-slate-400">
      <button onClick={modalOff} className="absolute top-1 right-1 text-xl bg-white rounded-full "> <FaXmark></FaXmark> </button>
      
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div>Name : {user?.displayName}</div>
      <div>Enail : {user?.email}</div>

      <div className="mt-11">
        <button className="btn btn-sm bg-slate-800 text-white rounded-sm" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfileModal;
