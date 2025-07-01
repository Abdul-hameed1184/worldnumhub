import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import HomePage from './pages/HomePage'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Numbers from './pages/Numbers'
import BuyNumbers from './pages/UsaNumbers'
import NumbersHistory from './pages/NumbersHistory'
import Promocode from './pages/PromoCode'
import BankTransfer from './pages/BankTransfer'
import RechargeMethods from './pages/RechargeMethods'

function App() {
    const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>} >
        <Route path='/' element={<HomePage/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/transactions' element={<Transactions/>} />
        <Route path='/numbers' element={ <Numbers/>}  />
        <Route path="numbers-history" element={ <NumbersHistory/>} />
        <Route path='usa-numbers' element={<BuyNumbers/>} />
        <Route path="/recharge" element={<RechargeMethods />} />
        <Route path="/recharge/bank" element={<BankTransfer />} />
        <Route path="/recharge/promo" element={<Promocode />} />
      </Route> 
    ))

  return (
    <>
 <RouterProvider router={router} />
    </>
  )
}

export default App
