const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        minlength: [3, 'Company name must be at least 3 characters long'],
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [8, 'Address must be at least 8 characters long'],
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(value) {
                return /[A-Za-z]/.test(value) && /\d/.test(value) && /[@$!%*?&]/.test(value);
            },
            message: 'Password must contain at least one letter, one number, and one special character'
        }
    }
});

module.exports = mongoose.model('Company', companySchema);
