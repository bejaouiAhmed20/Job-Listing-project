const express = require("express");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const PORT = 5000;

const app = express();
app.set("view engine", "ejs");
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/admin", adminRoutes);
app.use("/application", applicationRoutes);
mongoose
  .connect("mongodb://localhost:27017/jobListing")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
