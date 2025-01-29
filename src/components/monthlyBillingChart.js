import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import moment from "moment";

const MonthlyBillingChart = () => {
  const bills = useSelector((state) => state.bills);

  const monthlyTotals = {};
  bills.forEach((bill) => {
    const month = moment(bill.date, "MM-DD-YYYY").format("YYYY-MM");
    monthlyTotals[month] = (monthlyTotals[month] || 0) + parseFloat(bill.text);
  });

  const data = Object.keys(monthlyTotals).sort().map((month) => ({
    month,
    amount: monthlyTotals[month],
  }));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold text-center mb-4">Monthly Billing Cycle</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBillingChart;