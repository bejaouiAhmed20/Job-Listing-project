const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Routes
router.get('/offer/:offer_id', applicationController.getApplicationsByOfferId);
router.get('/client/:client_id', applicationController.getApplicationsByClientId);
router.get('/:id', applicationController.getApplicationById);
router.post('/', applicationController.createApplication);
router.delete('/:id', applicationController.deleteApplication);
router.post('/:id/approve', applicationController.approveApplication);
router.post('/:id/reject', applicationController.rejectApplication);

module.exports = router;
