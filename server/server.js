const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Registration API is running",
  });
});


// Registration API
app.post("/register", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      age,
      phone,
      address,
      course,
      gender,
    } = req.body;


    // Required field validation
    if (
      !name ||
      !email ||
      !password ||
      !age ||
      !phone ||
      !address ||
      !course ||
      !gender
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      phone,
      address,
      course,
      gender,
    });


    await user.save();


    res.status(201).json({
      message: "Registration successful",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});