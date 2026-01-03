import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../Store/Auth/Slice';
import AuthApi from '../../Api/Auth/Auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

            const token = res.data?.data?.token;
            if (!token) throw new Error("Token missing");

            localStorage.setItem("token", token);

            dispatch(setAuthData({ isLoggedIn: true }));
            navigate("/");

        } catch (err) {
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
                            className="w-full px-3 py-2 border rounded"
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
                            className="w-full px-3 py-2 border rounded"
                        />
                        <Link to="/forgot-password" className='text-blue-600'>Forgot Password</Link>
                    </div>

                    <button type="submit" className="w-full py-2 px-4 border rounded-2xl">
                        Login
                    </button>

                    <div className="text-center text-sm">
                        <span>Don't have an account? </span>
                        <Link to="/signup" className='text-blue-600'>Sign up here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
