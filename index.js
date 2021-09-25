const express = require("express");
const cors = require("cors");
const connect = require("./config/db");

const app = express();

require("dotenv").config({
  path: "./config/config.env",
});

connect();

app.use(cors());

app.use(express.json());

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");

app.use("/api/", authRoute);
app.use("/api", userRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
