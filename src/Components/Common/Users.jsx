import React, { useState, useEffect } from "react";
import UserApi from "../../Api/User/UserApi";
import MainLayout from "./MainLayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await UserApi.getUsers({
        page: 1,
        limit: 3,
      });

      const usersData =
        res.data?.data ||
        res.data?.users ||
        res.data?.data?.items ||
        [];

      setUsers(usersData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <MainLayout>
      <h1 className='text-5xl text-center mt-10'> Wellcom To Users List Page </h1>
      {loading && <p>Loading users...</p>}
      {error && <p className='text-xl text-center mt-3 text-red-600'>{error}</p>}
      {!loading && !error && (
        <>
          {users.length === 0 ? (
            <p>No users</p>
          ) : (
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Users;
