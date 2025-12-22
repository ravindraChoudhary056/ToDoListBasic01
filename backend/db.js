// mongo db setup he jaha mane mongo db connect karwaya he

const mongoose = require("mongoose");
require("dotenv").config(); // env load 

const mongoDb = async () => {
  try {
    // if you use my project  change this line (add your own MongoDB connection string)
    // and dont need env file
    await mongoose.connect(`${process.env.MONGO_URL}/authDB`);

  console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
};

module.exports = mongoDb;
