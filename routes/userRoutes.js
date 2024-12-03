require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../Schemas/user");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const {
  getJobListingById,
  getJobListing,

} = require("../controllers/offerController");
const {  createApplication,GetOffersByclientId} = require('../controllers/applicationController')

router.get("/login", (req, res) => {
  res.render("userlogin");
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Cannot find user");
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // Set the token as a cookie
      res.cookie("token", accessToken, {
        httpOnly: true, // Prevent access from JavaScript
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 3600000, // 1 hour in milliseconds
      });

      res.redirect("/user/home");
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/add", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      password: hashedPassword,
    };
    const saveUser = new User(user);
    await saveUser.save();
    res.redirect("/user/login");
  } catch (err) {
    console.log(err);
    res.status(500).send("something wrong!");
  }
});

router.get("/signup", (req, res) => {
  res.render("usersignup");
});

router.get("/search/:nom", (req, res) => {
  const nom = req.params.nom;
  res.send(nom);
});

router.get("/appliedJobs",authenticateToken, GetOffersByclientId);
router.post("/apply/:id",authenticateToken,createApplication)
router.get("/home", authenticateToken, getJobListing);
router.get("/jobs/:id",authenticateToken, getJobListingById);

router.put("/userprofile", (req, res) => {
  res.send("user profile");
});
router.get("/userprofile", (req, res) => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
    phone: "123-456-7890",
    about: "A passionate software developer.",
  };

  res.render("userprofile", { user });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/user/login"); 
});

module.exports = router;
