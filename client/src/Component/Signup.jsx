import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    address: "",
    course: "",
    gender: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    for (let key in value) {
      if (!value[key]) {
        alert(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        value
      );

      alert(response.data.message);

      // Clear form after successful registration
      setValue({
        name: "",
        email: "",
        password: "",
        age: "",
        phone: "",
        address: "",
        course: "",
        gender: "",
      });
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Registration failed");
      } else {
        alert("Server is not responding");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 to-purple-400 flex items-center justify-center px-3 py-3">

      {/* Registration Card */}
      <div className="w-full max-w-[400px] bg-orange-600 rounded-[22px] px-4 sm:px-6 py-4 shadow-2xl">

        {/* Heading */}
        <h2 className="text-[26px] leading-tight font-bold text-white text-center mb-3">
          Registration Form
        </h2>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={value.name}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={value.email}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={value.password}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          />

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={value.age}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          />

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={value.phone}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={value.address}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          />

          {/* Course */}
          <input
            type="text"
            placeholder="Course"
            name="course"
            value={value.course}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          />

          {/* Gender */}
          <select
            name="gender"
            value={value.gender}
            onChange={handleChange}
            className="w-full h-9 px-3 rounded-xl bg-white outline-none text-gray-700 text-sm"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Register Button */}
          <button
            type="submit"
            className="mx-auto mt-1 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-base px-7 py-2 rounded-full transition duration-200"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}