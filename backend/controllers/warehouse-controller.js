const HttpError = require("../models/http-error");
const Warehouse = require("../models/warehouse");

const createWarehouse = async (req, res, next) => {
    const { name, location } = req.body;
    
    const createdWarehouse = new Warehouse({
        name,
        location,
    });
    
    try {
        await createdWarehouse.save();
    } catch (err) {
        const error = new HttpError(
        "Creating warehouse failed, please try again.",
        500
        );
        return next(error);
    }
    
    res.status(201).json({ warehouse: createdWarehouse });
};

exports.createWarehouse = createWarehouse;