import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { AccountEndpPoints } from "../services/apis";

let { GETTRANSACTIONS_API } = AccountEndpPoints;

function Dashboard() {
  const state = useSelector((state) => state);
  const [transactions, setTransactions] = useState([]);
  let token = state.auth.token;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let resp = await apiConnector("GET", GETTRANSACTIONS_API, null, {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        });

        if (resp.data.success) {
          setTransactions(resp.data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div className="px-14 py-8 box-overflow">
      <h1 className="text-2xl  mb-4 text-slate-700 font-medium">Transactions</h1>
      <div className="transactions-table">
        {transactions.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.fromUserId.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.toUserId.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className={`w-[100px] py-2 rounded-lg ${transaction.type === 'send' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {transaction.type}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
