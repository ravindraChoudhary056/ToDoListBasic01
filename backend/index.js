// index.js
const express = require("express");
const cors = require("cors");
const mongoDb = require("./db");
const app = express();
const port = 5000;

// connect MongoDB  by function calling 
mongoDb();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", require("./routes/auth"));


// test route  // server run hoe hi ek bar root path defualt call karta he
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
