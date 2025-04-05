const mongoose = require("mongoose");

// User Schema Model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
        unique: [
            true,
            "Username already registered, please use different email.",
        ],
        maxLength: 100,
        trim: true,
    },
    email: {
        type: String,
        maxLength: 50,
        required: [true, "Please enter email address."],
        unique: [true, "Email already registered, please use different email."],
        trim: true,
        lowercase: true,
        validate: function (value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        },
    },
    password: {
        type: String,
        required: true,
        maxLength: 50,
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

module.exports = mongoose.model("users", userSchema);
