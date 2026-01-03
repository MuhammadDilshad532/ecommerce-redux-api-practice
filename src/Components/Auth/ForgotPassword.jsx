import React from 'react'
import { useState } from 'react'
import AuthApi from '../../Api/Auth/Auth'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError("")
        setMessage("");
        try {
            const res = await AuthApi.ForgotPassword({email});
            setMessage("Password reset email sent successfully ")
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong "
            )
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen flex  items-center justify-center bg-gray-100 py-12 px-4 '>
            <div className='max-w-md w-full bg-white p-10 rounded-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                    <h1 className='text-xl'>Forgot Password</h1>
                    <input
                        type="email"
                        placeholder='enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1  w-full px-3 py-2 border rounded-md  focus:outline-none "
                    />
                    <button type='submit' disabled={loading} className='border p-2 rounded-lg'>
                        {loading ? " sending..." : "sent reset link"}
                    </button>
                    {message && <p className='text-green-600'>{message}</p>}
                    {error && <p className='text-red-600'>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword