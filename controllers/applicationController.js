const Application = require('../Schemas/application'); 
const Offer = require('../Schemas/jobListing')
const User = require('../Schemas/user');


const getApplicationsByOfferId = async (req, res) => {
    const { offer_id } = req.params;
    try {
        const applications = await Application.find({ offer_id });
        res.status(200).send("Application ");
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving applications by company ID' });
    }
};

// Get applications by client ID
const getApplicationsByClientId = async (req, res) => {
    const { client_id } = req.params;
    try {
        const applications = await Application.find({ client_id });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving applications by client ID' });
    }
};

// Get application by ID
const getApplicationById = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving application by ID' });
    }
};

// Create a new application
const createApplication = async (req, res) => {
    const offer_id = req.params.id
    const client_id = req.user.userId;
        try {
        const application = await Application.create({ client_id, offer_id });
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: 'Error creating application', details: error.message });
    }
};

// Delete an application
const deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByIdAndDelete(id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting application' });
    }
};


const GetOffersByclientId = async (req, res) => {
    try {
        // Fetch applications associated with the client_id
        const applications = await Application.find({ client_id: req.user.userId }).populate('offer_id');

        if (!applications || applications.length === 0) {
            return res.render('companyAppliction', { applications: [] });
        }

        // Attach offer details to applications
        const enrichedApplications = applications.map(app => ({
            ...app._doc,
            offer: app.offer_id,
        }));

        // Render the EJS page with applications data
        res.render('userApplication', { applications: enrichedApplications });
    } catch (err) {
        console.error('Error retrieving applications:', err);
        res.status(500).send('An error occurred while retrieving applications.');
    }
};


const GetClientsByOfferId = async (req, res) => {
    try {
        const { offerId } = req.params;

        // Fetch applications associated with the offer_id
        const applications = await Application.find({ offer_id: offerId }).populate('client_id');

        if (!applications || applications.length === 0) {
            return res.render('companyApplications', { applications: [] });
        }

        // Attach client details to applications
        const enrichedApplications = applications.map(app => ({
            ...app._doc,
            client: app.client_id,
        }));

        // Render the EJS page with applications and client data
        res.render('companyApplications', { applications: enrichedApplications });
    } catch (err) {
        console.error('Error retrieving applications:', err);
        res.status(500).send('An error occurred while retrieving applications.');
    }
};


// Approve an application
const approveApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByIdAndUpdate(
            id,
            { status: 'approved' },
            { new: true }
        );
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error approving application' });
    }
};

// Reject an application
const rejectApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByIdAndUpdate(
            id,
            { status: 'rejected' },
            { new: true }
        );
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting application' });
    }
};

module.exports = {
    GetClientsByOfferId,
    GetOffersByclientId,
    getApplicationsByOfferId,
    getApplicationsByClientId,
    getApplicationById,
    createApplication,
    deleteApplication,
    approveApplication,
    rejectApplication,
};
