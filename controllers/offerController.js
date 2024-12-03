require("dotenv").config();
const Job = require("../Schemas/jobListing");
const Company = require('../Schemas/company')
const {getCompanyById} = require('./companyControllers')


const getJobListing = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.render("userhomepage", { jobs });
  } catch (err) {
    console.log(err);
    res.status(500).send("something wrong!");
  }
};
const getJobListingById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id);
   const company =  await getCompanyById(job.idCompany)
    console.log(company)
    res.render('userapply', { job,company });
} catch (err) {
    console.log(err);
    res.status(500).send("something wrong!");
  }
};



module.exports = {
  getJobListing,getJobListingById
};
