import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import HomePage from './pages/HomePage'

function App() {
    const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Route> 
    ))

  return (
    <>
 <RouterProvider router={router} />
    </>
  )
}

export default App
