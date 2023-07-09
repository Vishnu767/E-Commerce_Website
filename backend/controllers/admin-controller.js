const HttpError = require("../models/http-error");
const Admin = require("../models/admin");

const createAdmin = async (req, res, next) => {
    const { password } = req.body;
    const createdAdmin = new Admin({
        password: password,
    });
    try {
        await createdAdmin.save();
    } catch (err) {
        const error = new HttpError(
            "Couldn't create admin, please try again later.",
            500
        );
        return next(error);
    }
    res.status(201).json({ admin: createdAdmin });
};

const verifyAdmin = async (req, res, next) => {
    const { password } = req.body;
    let existingAdmin = [];
    try {
        existingAdmin = await Admin.find({ password: password });
    } catch (err) {
        const error = new HttpError(
            "Logging in failed, please try again later.",
            500
        );
        return next(error);
    }
    if (existingAdmin.length === 0) {
        res.send({ message: "Failure" });
    }else{
        res.send({ message: "Success", id: existingAdmin[0]._id });
    }
};

exports.verifyAdmin = verifyAdmin;
exports.createAdmin = createAdmin;