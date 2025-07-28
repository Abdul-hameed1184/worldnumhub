import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Numbers from "./pages/Numbers";
import BuyNumbers from "./pages/UsaNumbers";
import NumbersHistory from "./pages/NumbersHistory";
import Promocode from "./pages/PromoCode";
import BankTransfer from "./pages/BankTransfer";
import RechargeMethods from "./pages/RechargeMethods";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const { user, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
    console.log({ user });
  }, [checkAuth]);

  // Wait for authentication check before rendering routes
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* === Routes WITHOUT Layout === */}
        <Route path="/" element={user ? <Navigate to={"/dashboard"} /> : <HomePage />} />
        <Route
          path="/sign-in"
          element={user ? <Navigate to={"/dashboard"} /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to={"/dashboard"} /> : <SignUp />}
        />
        <Route
          path="/reset-password"
          element={user ? <Navigate to={"/dashboard"} /> : <ResetPassword />}
        />

        {/* === Routes WITH Layout === */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to={"/"} />}
          />
          <Route
            path="/transactions"
            element={user ? <Transactions /> : <Navigate to={"/"} />}
          />
          <Route
            path="/numbers"
            element={user ? <Numbers /> : <Navigate to={"/"} />}
          />
          <Route
            path="/usa-numbers"
            element={user ? <BuyNumbers /> : <Navigate to={"/"} />}
          />
          <Route
            path="/numbers-history"
            element={user ? <NumbersHistory /> : <Navigate to={"/"} />}
          />
          <Route
            path="/recharge"
            element={user ? <RechargeMethods /> : <Navigate to={"/"} />}
          />
          <Route
            path="/recharge/bank"
            element={user ? <BankTransfer /> : <Navigate to={"/"} />}
          />
          <Route
            path="/recharge/promo"
            element={user ? <Promocode /> : <Navigate to={"/"} />}
          />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
