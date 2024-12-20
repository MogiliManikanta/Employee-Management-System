const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const userRegister = require("./userSeed");
const authRouter = require("./routes/auth");
const departmentRouter = require("./routes/department");
const employeeRouter = require("./routes/employee");
const salaryRouter = require("./routes/salary");
const leaveRouter = require("./routes/leave");
const settingRouter = require("./routes/setting");
const dashboardRouter = require("./routes/dashboard");
dotEnv.config();
const app = express();
app.use(cors());
app.use(express.json());
userRegister();
app.use(express.static("public/uploads"));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter);
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
