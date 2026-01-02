import React from 'react'
import SignUp from '../Auth/SignUp'
import Login from '../Auth/Login'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}

export default AppRouter
