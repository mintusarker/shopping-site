import React, { useContext } from "react";
import UserDashBoardHome from "./UserDashBoardHome";
import AdminDashboardHome from "./AdminDashboardHome";
import { AuthContext } from "../../auth/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsadmin] = useAdmin(user?.email);
  return (
    <div>
      {isAdmin ? (
        <AdminDashboardHome></AdminDashboardHome>
      ) : (
        <UserDashBoardHome></UserDashBoardHome>
      )}
    </div>
  );
};

export default DashboardHome;
