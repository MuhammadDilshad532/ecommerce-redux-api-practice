import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Api/Auth/Auth";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            await AuthApi.ForgotPassword({ email });
            localStorage.setItem("email", email);
            localStorage.setItem("flow", "forgot");
            navigate("/verify-otp");
        } catch (err) {
            setError(err.response?.data?.message || "Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex  items-center justify-center bg-gray-100 py-12 px-4 '>
            <div className='max-w-md w-full bg-white p-10 rounded-lg'>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center text-3xl font-bold">Forgot Password</h2>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-3  w-full px-3 py-2 border rounded-md  focus:outline-none "
                    />

                    <button disabled={loading} className='w-full mt-2 border p-2 rounded-lg cursor-pointer'>
                        {loading ? "Sending..." : "Send OTP"}
                    </button>

                    {error && <p className='text-red-600'>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
