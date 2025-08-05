import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
      navigate('/login')
    })
  }
  return (
    <div
      className='inline-block px-6 py-2  duration-200 hover:bg-red-500 hover:text-white hover:cursor-pointer rounded-full'
      onClick={handleLogout}
    >
      Logout
    </div>
  )
}

export default LogoutBtn