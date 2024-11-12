const express = require('express')
const router = express.Router()


const jobListings = [

        {
          id: '1',
          title: 'Software Engineer',
          companyName: 'Tech Solutions',
          companyLogo: 'https://via.placeholder.com/80',
          location: 'New York, USA',
          salary: '$70,000 - $90,000',
          postDate: '2024-11-01',
          deadline: '2024-12-01',
          description: 'We are looking for a skilled software engineer to join our team.',
          requirements: ['3+ years experience', 'Proficient in JavaScript', 'Team player']
        },
        {
          id: '2',
          title: 'Product Manager',
          companyName: 'Innovatech',
          companyLogo: 'https://via.placeholder.com/80',
          location: 'San Francisco, USA',
          salary: '$100,000 - $120,000',
          postDate: '2024-11-05',
          deadline: '2024-12-10',
          description: 'Join our team as a Product Manager to lead the development of new features.',
          requirements: ['5+ years experience', 'Strong leadership skills', 'Excellent communication']
        },
        {
          id: '3',
          title: 'front end',
          companyName: 'Innovatech',
          companyLogo: 'https://via.placeholder.com/80',
          location: 'San Francisco, USA',
          salary: '$100,000 - $120,000',
          postDate: '2024-11-05',
          deadline: '2024-12-10',
          description: 'Join our team as a Product Manager to lead the development of new features.',
          requirements: ['5+ years experience', 'Strong leadership skills', 'Excellent communication']
        },
        {
          id: '4',
          title: 'ui/ux designer',
          companyName: 'Innovatech',
          companyLogo: 'https://via.placeholder.com/80',
          location: 'San Francisco, USA',
          salary: '$100,000 - $120,000',
          postDate: '2024-11-05',
          deadline: '2024-12-10',
          description: 'Join our team as a Product Manager to lead the development of new features.',
          requirements: ['5+ years experience', 'Strong leadership skills', 'Excellent communication']
        },
    
  ];
  
router.get('/login',(req,res)=>{
    res.render('userlogin')
})
router.get('/signup',(req,res)=>{
    res.render('usersignup')
})
router.get('/home',(req,res)=>{
    res.render('userhomepage',{jobs:jobListings})
})

router.get('/jobs/:id', (req, res) => {
    const jobId = req.params.id;   
    const job = jobListings.find(job => job.id === jobId);
    
    if (job) {
      res.render('userapply', { job });
    } else {
      res.status(404).send('Job not found');
    }
  });

  router.get('/userprofile', (req, res) => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      location: 'New York, USA',
      phone: '123-456-7890',
      about: 'A passionate software developer.'
    };
  
    res.render('userprofile', { user });
  });
  

module.exports = router