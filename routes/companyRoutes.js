const express = require('express')
const router = express.Router()


router.get('/login',(req,res)=>{
    res.render('companylogin')
})
router.get('/signup',(req,res)=>{
    res.render('companysignup')
})
router.get('/companydashboard', (req, res) => {
    const jobs = [
      { id: 1, title: 'Software Engineer', location: 'Remote', salary: '$100,000', postDate: '2023-11-01' },
      { id: 2, title: 'Product Manager', location: 'San Francisco', salary: '$120,000', postDate: '2023-10-20' },
      { id: 3, title: 'Data Scientist', location: 'New York', salary: '$110,000', postDate: '2023-09-15' }
    ];
  
    res.render('companydashboard', { jobs });
  });
  
  router.get('/companyprofile', (req, res) => {
    const company = {
      name: 'Tech Solutions Inc.',
      email: 'contact@techsolutions.com',
      location: 'San Francisco, CA',
      phone: '987-654-3210',
      about: 'We are a leading tech company specializing in software solutions.'
    };
  
    res.render('companyprofile', { company });
  });
  

module.exports = router