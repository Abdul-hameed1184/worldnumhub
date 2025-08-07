// App.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";

import Layout from "./Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Numbers from "./pages/Numbers";
import BuyNumbers from "./pages/UsaNumbers";
import NumbersHistory from "./pages/NumbersHistory";
import Promocode from "./pages/PromoCode";
import BankTransfer from "./pages/BankTransfer";
import RechargeMethods from "./pages/RechargeMethods";
import PaymentSuccess from "./pages/PaymentSuccess";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/sign-in" replace />;
}

function App() {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* === Public Routes === */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <HomePage />} />
        <Route path="/sign-in" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/sign-up" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/reset-password" element={user ? <Navigate to="/dashboard" /> : <ResetPassword />} />

        {/* === Protected Routes with Layout === */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/numbers" element={<ProtectedRoute><Numbers /></ProtectedRoute>} />
          <Route path="/usa-numbers" element={<ProtectedRoute><BuyNumbers /></ProtectedRoute>} />
          <Route path="/numbers-history" element={<ProtectedRoute><NumbersHistory /></ProtectedRoute>} />
          <Route path="/recharge" element={<ProtectedRoute><RechargeMethods /></ProtectedRoute>} />
          <Route path="/recharge/bank" element={<ProtectedRoute><BankTransfer /></ProtectedRoute>} />
          <Route path="/recharge/promo" element={<ProtectedRoute><Promocode /></ProtectedRoute>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
