import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBill, editBill } from "../features/bill_manager/billsSlice";
import { FiTrash2 } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Bills = () => {
  const bills = useSelector((state) => state.bills);
  const dispatch = useDispatch();
  const [budget, setBudget] = useState(0);
  const [selectedBills, setSelectedBills] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newAmount, setNewAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const calculateBillsToPay = () => {
    let sortedBills = [...bills].sort(
      (a, b) => parseFloat(a.text) - parseFloat(b.text)
    );
    let total = 0;
    let selected = [];

    for (let bill of sortedBills) {
      if (total + parseFloat(bill.text) <= budget) {
        total += parseFloat(bill.text);
        selected.push(bill.id);
      } else {
        break;
      }
    }
    setSelectedBills(selected);
  };

  const handleEdit = (id) => {
    dispatch(editBill({ id, text: newAmount }));
    setEditId(null);
    setNewAmount("");
  };

  const categories = ["All", ...new Set(bills.map((bill) => bill.category))];

  const filteredBills =
    selectedCategory === "All"
      ? bills
      : bills.filter((bill) => bill.category === selectedCategory);

  const chartData = filteredBills.map((bill) => ({
    date: bill.date,
    amount: parseFloat(bill.text),
  }));

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
        Your Bills
      </h2>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter Monthly Budget"
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-2/3"
        />
        <button
          onClick={calculateBillsToPay}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Calculate Bills to Pay
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Filter by Category:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredBills.length === 0 ? (
        <p className="text-gray-500 text-center">
          No bills found for this category.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-sm">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="p-3">Amount</th>
                <th className="p-3">Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill, index) => (
                <tr
                  key={bill.id}
                  className={`border-b ${
                    selectedBills.includes(bill.id)
                      ? "bg-green-200"
                      : index % 2 === 0
                      ? "bg-gray-50"
                      : "bg-gray-100"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-3 text-gray-800 font-semibold">
                    {editId === bill.id ? (
                      <input
                        type="number"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        className="border rounded p-1"
                      />
                    ) : (
                      bill.text
                    )}
                  </td>
                  <td className="p-3 text-gray-700">{bill.description}</td>
                  <td className="p-3 text-gray-700">{bill.category}</td>
                  <td className="p-3 text-gray-700">{bill.date}</td>
                  <td className="p-3 text-center">
                    {editId === bill.id ? (
                      <button
                        onClick={() => handleEdit(bill.id)}
                        className="text-green-500 mr-2"
                      >
                        ✔
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditId(bill.id)}
                        className="text-blue-500 mr-2"
                      >
                        ✎
                      </button>
                    )}
                    <button
                      onClick={() => dispatch(removeBill(bill.id))}
                      className="text-red-500 hover:text-red-700 transition duration-300 p-2 rounded-lg"
                      aria-label="Remove bill"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center mb-3">
          Monthly Billing Cycle
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Bills;
