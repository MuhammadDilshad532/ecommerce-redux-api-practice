import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Api/Auth/Auth";

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
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

        const email = localStorage.getItem("email");

        try {
            setLoading(true);
            setError("");

            await AuthApi.ResetPassword({
                email,
                otp,
                newPassword: password,
            });

            localStorage.removeItem("email");
            localStorage.removeItem("resetToken");
            localStorage.removeItem("otp");
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
                <label htmlFor="otp" className="">OTP</label>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                    className="  w-full px-3 py-2 border rounded-md  focus:outline-none "
                />
                <div className="mt-2">
                <label htmlFor="password" className=""> New Password</label>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="  w-full px-3 py-2 border rounded-md  focus:outline-none "
                />
                </div>
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
