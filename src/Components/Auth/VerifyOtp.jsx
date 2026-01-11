import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../Api/Auth/Auth";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const flow = localStorage.getItem("flow");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be a 4-digit number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await AuthApi.verifyOtp({
        email,
        otp,
      });

      const token = res.data?.token || res.data?.resetToken;
      if (token) {
        localStorage.setItem("resetToken", token);
      }
      localStorage.setItem("otp", otp);

      if (flow === "forgot") {
        navigate("/reset-password");
      } else {
        navigate("/login");
      }

      localStorage.removeItem("flow");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex  items-center justify-center bg-gray-100 py-12 px-4 '>
      <div className='max-w-md w-full bg-white p-10 rounded-lg'>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center text-3xl font-bold">Verify OTP</h2>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="Enter 4-digit OTP"
            required
            className="mt-3  w-full px-3 py-2 border  rounded-md  focus:outline-none "
          />

          <button disabled={loading} className="mt-4 w-full py-2 px-4 border rounded-2xl cursor-pointer">
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {error && <p className="text-red-400">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
