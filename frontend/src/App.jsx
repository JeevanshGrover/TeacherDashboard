import './App.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar.jsx'
import Navbar from './components/layout/Navbar.jsx'

function App() {

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
