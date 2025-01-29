import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../features/bill_manager/billsSlice";
import { FiPlusCircle } from "react-icons/fi";

const AddBill = () => {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const handleAddBill = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(
      addBill({
        text: input.trim(),
        description: description.trim(),
        category: category.trim(),
        date: date.trim(),
      })
    );
    setInput("");
    setDescription("");
    setCategory("");
    setDate("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
        Add a New Bill
      </h2>
      <form onSubmit={handleAddBill} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter bill amount..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 mb-2"
            aria-label="Bill description"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter bill description..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 mb-2"
            aria-label="Bill description"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter bill category..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 mb-2"
            aria-label="Bill description"
          />
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter billing date (MM-DD-YYYY)"
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            aria-label="Bill description"
          />
          <FiPlusCircle className="absolute right-4 top-4 text-gray-400 text-xl" />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2"
        >
          <FiPlusCircle className="text-lg" /> Add Bill
        </button>
      </form>
    </div>
  );
};

export default AddBill;
