import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from './store/store.js'
import Dashboard from './pages/Dashboard.jsx'
import Teachers from "./pages/Teachers.jsx"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element = {<App />}>
      <Route index element={<Dashboard />} />
      <Route path="teachers" element={<Teachers />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <RouterProvider router = {router} />
  </Provider >
)
