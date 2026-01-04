import { useState } from "react";
import { useDispatch } from "react-redux";
import AuthApi from "../../Api/Auth/Auth";
import { setAuthData } from "../../Store/Auth/Slice";
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
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
            const res = await AuthApi.signUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "USER",
            });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                dispatch(setAuthData(res.data.user));
                alert("Signup successful");
            } else {
                localStorage.setItem("email", formData.email);
                navigate("/verifyotp");
            }

            setLoading(false);
        } catch (err) {
            console.log(err.response?.data);
            setError(err.response?.data?.message || "Signup failed");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center  justify-center bg-gray-100 py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg ">
                <h1 className="text-center text-3xl font-bold">Signup</h1>

                {error && <p className="text-red-600">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1  w-full px-3 py-2 border  rounded-md  focus:outline-none "
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1  w-full px-3 py-2 border rounded-md  focus:outline-none "
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
                            className="mt-1  w-full px-3 py-2 border  rounded-md  focus:outline-none "
                        />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 border rounded-2xl">
                        Signup
                    </button>
                    <div className="text-center">
                        <span>Already have an account?</span>
                        <Link to={"/login"} className="text-blue-700">login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
