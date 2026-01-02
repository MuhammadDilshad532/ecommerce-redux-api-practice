import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../Store/Auth/Slice';
import AuthApi from '../../Api/Auth/Auth';

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await AuthApi.login(formData);

    console.log("LOGIN RESPONSE ", res.data);

    const token = res.data?.data?.token;

    if (!token) {
      throw new Error("Token missing from response");
    }

    
    localStorage.setItem("token", token);

   
    dispatch(setAuthData({}));

    alert("Login successful");

  } catch (err) {
    console.error("LOGIN ERROR ", err.response || err.message);

    setError(
      err.response?.data?.message ||
      err.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-10 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-2 border rounded bg-black text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
