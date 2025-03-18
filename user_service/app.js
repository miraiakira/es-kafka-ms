const express = require("express");

const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

app.use("/hello", (req, res) => {
  res.send("Hello from the server!");
});

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
