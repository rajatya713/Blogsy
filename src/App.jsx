
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  
  
  return !isLoading ? (
  <div className='min-h-screen flex flex-wrap justify-between bg-[#FAF7F3]'>
    <div className='w-full block'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>

) : null
}

export default App
