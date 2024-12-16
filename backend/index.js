const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const userRegister = require("./userSeed");
const authRouter = require("./routes/auth");
const departmentRouter = require("./routes/department");
const employeeRouter = require("./routes/employee");
dotEnv.config();
const app = express();
app.use(cors());
app.use(express.json());
userRegister();
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
