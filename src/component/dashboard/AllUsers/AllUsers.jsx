import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../auth/AuthProvider";
import { deleteUser, getAuth } from "firebase/auth";
import app from "../../../firebase/firebase.config";

const AllUsers = () => {
  // const { userDelete } = useContext(AuthContext);
  const [users, setUsers] = useState();
  // console.log(users);

  const auth = getAuth(app);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  //user delete
  const UserDelete = (_id) => {
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "DELETE",
      headers: {
        content: "application/json",
      },
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .then((data) => {
        console.log(data);
        const restUsers = users?.filter((user) => user?._id !== _id);
        setUsers(restUsers);
        if (data.deletedCount) {
          toast.success(`User deleted successfully`);
        }
      });
  };

  return (
    <div className="px-12 my-4">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-red-700 text-[15px]">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user?._id}>
                <th>{1 + i}</th>
                <th>{user?.name}</th>
                <td>{user?.email}</td>

                {user?.role ? (
                  <td className="text-md font-semibold bg-slate-600 inline-block text-white">
                    Admin
                  </td>
                ) : (
                  <td className="text-md font-semibold">user</td>
                )}

                <td>
                  {!user?.role && (
                    <button
                      onClick={() => UserDelete(user?._id)}
                      className="btn btn-xs btn-neutral text-white rounded-sm"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
