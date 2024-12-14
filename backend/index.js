const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const userRegister = require("./userSeed");
const authRouter = require("./routes/auth");
dotEnv.config();
const app = express();
app.use(cors());
app.use(express.json());
userRegister();
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
