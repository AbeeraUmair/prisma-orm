"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import

export default function StudentForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [teacherId, setTeacherId] = useState<number | undefined>();
  const [subjectIds, setSubjectIds] = useState<number[]>([]);
  const router = useRouter(); // This will now work correctly

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { name, email, teacherId: teacherId || null, subjectIds: subjectIds.length ? subjectIds : [] };

    try {
      const response = await fetch("/api/createStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/success"); // Redirect to success page
      } else {
        const errorData = await response.json();
        console.error("Error creating student:", errorData);
      }
      
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        console.error("Error:", error.message); // Log the error message
      }
       else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-16">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Student</h2>

      <div className="mb-4 mt-4">
        <label className="block text-gray-700 mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Teacher ID (optional):</label>
        <input
          type="number"
          value={teacherId ?? ""}
          onChange={(e) => setTeacherId(Number(e.target.value) || undefined)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Subject IDs (comma-separated, optional):</label>
        <input
          type="text"
          value={subjectIds.join(",")}
          onChange={(e) =>
            setSubjectIds(e.target.value.split(",").map((id) => parseInt(id.trim(), 10) || 0))
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-150"
      >
        Create Student
      </button>
    </form>
  );
}
