const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/user");

// Post request to create a new object in the database
const createUser = async (req, res, next) => {

    const { name, email } = req.body;

    const createdUser = new User({
        name: name,
        email: email
    });

    console.log("createdUser: (From user-controller) ", createdUser);

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            "Creating user failed, please try again. (From user-controller)",
            500
        );
        return next(error);
    }
    console.log("Saved user! (From user-controller)\n");
    res.status(201).json({ user: createdUser });

};


// Search user based on email
const searchUser = async (req, res, next) => {
    const email  = req.params.email;
    console.log("email: (From user-controller)", email);
    let requiredUser = [];
    try{
        const requiredUser = await User.find({email: email})
        console.log("User Found: (From user-controller)", requiredUser);
        res.send(requiredUser);
    } catch (err){
        console.error(err);
        res.send(requiredUser);
    }
    
    // console.log("email: ", email);
};

exports.createUser = createUser;
exports.searchUser = searchUser;