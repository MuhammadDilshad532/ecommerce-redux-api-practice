import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from '../../Api/Auth/Auth'
const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const email = localStorage.getItem("email")
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) {
            setError("Email not found. Please restart forgot password process.")
            return
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }
        try {
            setLoading(true)
            setError("")
            await AuthApi.ResetPassword({
                email,
                password
            })
            localStorage.removeItem("email")
            navigate("/login")
        } catch (err) {
            setError(err.response?.data?.message || " Password reset failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='max-w-md bg-white p-10 w-full rounded-lg '>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                    <h1 className='text-center text-3xl font-bold pb-3'>Reset password</h1>
                    <div>
                        <label> New Password</label>
                        <input
                            type="password"
                            placeholder='New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1  w-full px-3 py-2 border  rounded-md  focus:outline-none"
                        />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1  w-full px-3 py-2 border  rounded-md  focus:outline-none"
                        />
                    </div>
                    <button type='submit' disabled={loading} className='className="w-full py-2 px-4 border rounded-2xl mt-2'>
                        {loading ? "resting.." : "Confirm"}
                    </button>
                    {error && (
                        <p className='text-red-600'>{error}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ResetPassword