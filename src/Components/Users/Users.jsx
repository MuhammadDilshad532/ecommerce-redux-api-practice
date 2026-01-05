import React, { useState, useEffect } from 'react'
import UserApi from '../../Api/User/UserApi'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError("")

      const res = await UserApi.getUsers({
        page: 1,
        limit: 3,
      })

     
      console.log("USERS API RESPONSE ", res.data)
      const usersData =
        res.data?.data ||
        res.data?.users ||
        res.data?.data?.items ||
        []

      setUsers(usersData)

    } catch (err) {
      console.error("USERS API ERROR 👉", err)
      setError(err.response?.data?.message || "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h1>Users list</h1>

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
    </div>
  )
}

export default Users