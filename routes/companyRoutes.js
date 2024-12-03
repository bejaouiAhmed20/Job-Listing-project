const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticatecompany");

const {
  getJobsByCompanyId,
  createJobListing,
  navigateToEditPage,
  signup,
  login,
  deleteJobListing,
  editJobListing,
} = require("../controllers/companyControllers");
const {GetClientsByOfferId} = require('../controllers/applicationController')

router.get("/login", (req, res) => {
  res.render("companylogin");
});
router.get("/offer/edit/:id", authenticateToken, navigateToEditPage);
router.post("/offer/delete/:id", authenticateToken, deleteJobListing);
router.post("/offer/edit/:id", authenticateToken, editJobListing);

router.get("/addjoboffer", (req, res) => {
  res.render("addjoboffer");
});
router.post("/offer/add", authenticateToken, createJobListing);

router.get("/signup", (req, res) => {
  res.render("companysignup");
});
router.post("/signup", signup);
router.post("/login", login);
router.get("/jobs", (req, res) => {
  res.send("all jobs for a company");
});

router.post("/offer/add", createJobListing);
router.get("/applications/:offerId",authenticateToken,GetClientsByOfferId );
router.get("/companydashboard", authenticateToken, getJobsByCompanyId);

router.get("/companyprofile", (req, res) => {
  const company = {
    name: "Tech Solutions Inc.",
    email: "contact@techsolutions.com",
    location: "San Francisco, CA",
    phone: "987-654-3210",
    about: "We are a leading tech company specializing in software solutions.",
  };

  res.render("companyprofile", { company });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/company/login"); 
});

module.exports = router;
