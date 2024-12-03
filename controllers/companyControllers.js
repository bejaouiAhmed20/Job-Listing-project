require("dotenv").config();
const Job = require("../Schemas/jobListing");
const Company = require("../Schemas/company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createJobListing = async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      description: req.body.description,
      requirements: req.body.requirements,
      location: req.body.location,
      salary: req.body.salary,
      deadline: req.body.deadline,
      idCompany: req.companyId, // Attach the company ID from the middleware
    });

    await job.save();
    res.redirect("/company/companydashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
};

const getJobListing = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.render("companydashboard", { jobs });
  } catch (err) {
    console.log(err);
    res.status(500).send("something wrong!");
  }
};
const navigateToEditPage = async (req, res) => {
  try {
    const job = await Job.findById({ _id: req.params.id });
    res.render("editjoboffer", { job });
  } catch (err) {
    console.log(err);
    res.status(500).send("something wrong!");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).send("Company not found");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { companyId: company._id, email: company.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }); // Use secure: true in production
    res.status(200).redirect("companydashboard"); // Redirect to dashboard
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
const getJobsByCompanyId = async (req, res) => {
  try {
    const companyId = req.companyId;
    console.log(typeof companyId);
    const jobs = await Job.find({ idCompany: companyId });


    res.status(200).render("companydashboard", { jobs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
};

const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const company = new Company({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      password: hashedPassword,
    });

    // Save the company to the database
    await company.save();

    // Redirect to the login page upon successful signup
    res.redirect("/company/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
};
const editJobListing = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJobData = {
      title: req.body.title,
      description: req.body.description,
      requirements: req.body.requirements,
      location: req.body.location,
      salary: req.body.salary,
      deadline: req.body.deadline,
    };

    // Find the job by ID and update it
    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).send("Job not found.");
    }

    res.redirect("/company/companydashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
};

const deleteJobListing = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job by ID and delete it
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).send("Job not found.");
    }

    res.redirect("/company/companydashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
};
const getCompanyById = async (company_id) => {
  try {
    const company = await Company.findById(company_id);
    return company;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getJobsByCompanyId,
  createJobListing,
  getJobListing,
  signup,
  login,
  navigateToEditPage,
  deleteJobListing,
  editJobListing,
  getCompanyById
};
