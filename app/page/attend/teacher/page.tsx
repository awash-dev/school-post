"use client";
import { db } from "@/Firebase";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Attendance() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("present");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      await addDoc(collection(db, "teachers-atendance"), {
        name,
        status,
        email,
        phone,
        date,
        createdAt: serverTimestamp(),
      });
      alert("Attendance Create successfully!");
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setStatus("present");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error registering teacher. Please try again!");
    }
    console.log({ name, email, date, status });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Daily Summit Attendance</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-1"
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
          <input
            id="phone"
            name="phone"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="email"
            className="block w-full rounded-md border border-gray-300 px-3 py-1 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="absent">Absent</option>
            <option value="present">Present</option>
            <option value="permission">Permission</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
