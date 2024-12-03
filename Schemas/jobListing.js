const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        minlength: [5, 'Job title must be at least 5 characters long'],
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        minlength: [20, 'Job description must be at least 20 characters long'],
        maxlength: [2000, 'Job description cannot exceed 2000 characters']
    },
    requirements: {
        type: String,
        required: [true, 'Job requirements is required'],
        minlength: [20, 'Job requirements must be at least 20 characters long'],
        maxlength: [2000, 'Job requirements cannot exceed 2000 characters']
    },
    location: {
        type: String,
        required: [true, 'Job location is required'],
        trim: true
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary must be a positive number']
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: [true, 'Application deadline is required'],
        validate: {
            validator: function(value) {
                return value > this.postDate;
            },
            message: 'Deadline must be later than the post date'
        }
    },
    idCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Refers to the 'Company' collection
        required: [true, 'Company ID is required'],
    }
});

module.exports = mongoose.model('JobListing', jobListingSchema);
