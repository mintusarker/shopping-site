import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState();
  console.log(users);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
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
                <td>user</td>
                <td>
                  <button
                    onClick={() => UserDelete(user?._id)}
                    className="btn btn-xs btn-neutral text-white rounded-sm"
                  >
                    Delete
                  </button>
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
