import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthApi from '../../Api/Auth/Auth'

const VerifyOtp = () => {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const email = localStorage.getItem("email");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email not found. Please sign up again.");
            return;
        }
        if (otp.length !== 4) {
            setError("OTP must be a 4-digit number.");
            return;
        }
        setLoading(true);
        setError("")
        try {
            await AuthApi.verifyOtp({ email, otp });
            localStorage.removeItem("email");
            navigate("/login")
        } catch (err) {
            setError(
                err.response?.data.message || "OTP verification failed"
            );
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4'>
            <div className='max-w-md  w-full  bg-white p-10 rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-5'>
                    <input
                        type="number"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder='enter 4-digit otp'
                        min="1000"
                        max="9999"
                        required
                        className="mt-1  w-full px-3 py-2 border rounded-md  focus:outline-none "
                    />
                    <button type='submit' className='border p-2 rounded-lg '>VerifyOtp</button>
                    {error && <p className='text-red-600'>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default VerifyOtp 