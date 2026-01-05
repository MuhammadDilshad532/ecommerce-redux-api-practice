import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Api/Auth/Auth";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await AuthApi.ResetPassword({
                password,
                confirmPassword,
            });

            localStorage.removeItem("email");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex  items-center justify-center bg-gray-100 py-12 px-4 '>
            <div className='max-w-md w-full bg-white p-10 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center text-3xl font-bold pb-4">Reset Password</h2>
                <label htmlFor="password" className=""> New Password</label>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="  w-full px-3 py-2 border rounded-md  focus:outline-none "
                />
                <div className="mt-2">
                <label htmlFor="password" className="">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="  w-full px-3 py-2 border rounded-md  focus:outline-none "
                />
                </div>

                <button disabled={loading} className="mt-2 w-full border p-2 rounded-lg cursor-pointer">
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

                {error && <p>{error}</p>}
            </form>
            </div>
            </div>
            );
};

            export default ResetPassword;
