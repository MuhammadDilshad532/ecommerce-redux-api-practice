import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from '../../Api/Auth/Auth'

const VerifyOtp = () => {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const email = localStorage.getItem("email")
  const flow = localStorage.getItem("flow") 

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError("Email not found. Please try again.")
      return
    }

    if (otp.length !== 4) {
      setError("OTP must be a 4-digit number.")
      return
    }

    try {
      setLoading(true)
      setError("")

      await AuthApi.verifyOtp({ email, otp })

      if (flow === "forgot") {
        navigate("/reset-password")
      } else {
        localStorage.removeItem("email")
        navigate("/login")
      }

      localStorage.removeItem("flow")

    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-center text-3xl font-bold">Verify OTP</h2>

          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 4-digit OTP"
           className="mt-1  w-full px-3 py-2 border  rounded-md  focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="border p-2 rounded-lg w-full"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp
