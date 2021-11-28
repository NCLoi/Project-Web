const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const GI = db.GI;

exports.create = async(req, res, next) => {
    if (!req.body.name) {
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    const gi = new GI({
        name: req.body.name,
        img: req.body.img,
        rarity: req.body.rarity,
        weapon: req.body.weapon,
        element: req.body.element,
        attalentsE: req.body.attalentsE,
        imgE: req.body.imgE,
        attalentsQ: req.body.attalentsQ,
        imgQ: req.body.imgQ,
        cvjp: req.body.cvjp,
        cven: req.body.cven,
        ingamedescription: req.body.ingamedescription,
        ownerId: req.userId,
    });

    const [error, document] = await handle(gi.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the contact"
            )
        );
    }

    return res.send(document);
};

// Retrieve all contacts of a user from the database
exports.findAll = async(req, res, next) => {
    const condition = {};
    const name = req.query.name;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [error, documents] = await handle(
        GI.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving contacts"
            )
        );
    }

    return res.send(documents);
};

// Find a single contact with an id
exports.findOne = async(req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        GI.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Info not found"));
    }

    return res.send(document);
};

// Update a contact by the id in the request
exports.update = async(req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data to update can not be empty")
        );
    }

    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        GI.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "info not found"));
    }

    return res.send({ message: "Info was updated successfully" });
};

// Delete a contact with the specified id in the request
exports.delete = async(req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        GI.findOneAndDelete(condition, {})
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "info not found"));
    }

    return res.send({ message: "info was deleted successfully" });
};

// Delete all contacts of a user from the database
exports.deleteAll = async(req, res, next) => {
    const [error, data] = await handle(
        GI.deleteMany({})
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all info"
            )
        );
    }

    return res.send({
        message: `${data.deletedCount} info were deleted successfully`,
    });
};