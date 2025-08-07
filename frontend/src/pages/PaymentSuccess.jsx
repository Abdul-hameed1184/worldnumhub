import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/useWalletStore";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const tx_ref = params.get("tx_ref");
  const navigate = useNavigate();

  const { verifyTransaction, loading } = useWalletStore();
  const [verified, setVerified] = useState(false); // track success

  useEffect(() => {
    const verifyAndRedirect = async () => {
      if (tx_ref) {
        try {
          const success = await verifyTransaction(tx_ref);
          console.log(tx_ref)
          if (success) {
            setVerified(true);
            // optional: short delay to show status
            setTimeout(() => {
              navigate("/dashboard");
            }, 1500);
          } else {
            // handle failure — maybe redirect or show message
            console.error("Verification failed");
          }
        } catch (err) {
          console.error("Error verifying transaction:", err);
        }
      }
    };

    verifyAndRedirect();
  }, [tx_ref, verifyTransaction, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {loading && (
          <>
            <h2 className="text-xl font-semibold mb-4">Processing Payment...</h2>
            <p className="text-gray-500">Verifying your transaction. Please wait...</p>
          </>
        )}
        {!loading && verified && (
          <>
            <h2 className="text-xl font-semibold mb-4">Payment Successful 🎉</h2>
            <p className="text-gray-500">Redirecting to dashboard...</p>
          </>
        )}
        {!loading && !verified && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-red-500">Verification Failed</h2>
            <p className="text-gray-500">Unable to verify your payment. Please contact support.</p>
          </>
        )}
        <button onClick={()=>navigate('/dashboard')} className="py-3 px-10 bg-orange-800 border-none">Back to dashboard</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
