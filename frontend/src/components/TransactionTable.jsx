// components/TransactionTable.jsx
const TransactionTable = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 px-3">Reference</th>
            <th className="py-2 px-3">Amount</th>
            <th className="py-2 px-3">Type</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-3">{txn.reference}</td>
              <td className="py-2 px-3">₦{formatAmount(txn.amount)}</td>
              <td className="py-2 px-3 capitalize">{txn.type}</td>
              <td className="py-2 px-3 capitalize">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    txn.status === "successful"
                      ? "bg-green-100 text-green-700"
                      : txn.status === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {txn.status}
                </span>
              </td>
              <td className="py-2 px-3">
                {new Date(txn.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
