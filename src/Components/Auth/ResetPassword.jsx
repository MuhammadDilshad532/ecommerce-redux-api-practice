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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Reset password</h1>
                <input
                    type="password"
                    placeholder='new Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder='confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type='submit' disabled={loading}>
                    {loading ? "resting.." : "reset password"}
                </button>
                {error && (
                    <p>{error}</p>
                )}
            </form>
        </div>
    )
}

export default ResetPassword