import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthApi from '../../Api/Auth/Auth'

const VerifyOtp = () => {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("")
        try {
            await AuthApi.VerifyOtp({ otp });
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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder='enter otp'
                className="mt-1  w-full px-3 py-2 border rounded-md  focus:outline-none "
            />
            <button type='submit'>VerifyOtp</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default VerifyOtp 