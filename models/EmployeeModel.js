const mongoose = require("mongoose");

// Employee Schema Model
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please enter first name"],
        trim: true,
        maxLength: 100,
    },
    last_name: {
        type: String,
        required: [true, "Please enter last name"],
        trim: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "Please enter email address."],
        unique: [true, "Email already exists, please use different email."],
        maxLength: 50,
        trim: true,
        lowercase: true,
        validate: function (value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        },
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        trim: true,
        lowercase: true,
    },
    salary: {
        type: Number,
        required: [true, "Please enter salary of employee"],
        validate(value) {
            if (value < 0.0) {
                throw new Error("Negative Salary aren't real.");
            }
        },
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updatedat: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("employees", employeeSchema);
