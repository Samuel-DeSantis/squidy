import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './pages/components/navbar'
import Footer from './pages/components/footer'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
