const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Weapon = db.Weapon;

exports.create = async(req, res, next) => {
    if (!req.body.namewp) {
        return next(new BadRequestError(400, "name weapon can not be empty"));
    }

    const wp = new Weapon({
        namewp: req.body.namewp,
        imgwp: req.body.imgwp,
        raritywp: req.body.raritywp,
        baseatk: req.body.baseatk,
        scstat: req.body.scstat,
        specialAD: req.body.specialAD,
        ownerId: req.userId,
    });

    const [error, document] = await handle(wp.save());

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
    const namewp = req.query.namewp;
    if (namewp) {
        condition.namewp = { $regex: new RegExp(namewp), $options: "i" };
    }

    const [error, documents] = await handle(
        Weapon.find(condition)
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
        Weapon.findOne(condition)
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
        Weapon.findOneAndUpdate(condition, req.body, {
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
        Weapon.findOneAndDelete(condition, {})
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
        Weapon.deleteMany({})
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

// Find all favorite contacts of a user
exports.findAllFavorite = async(req, res, next) => {
    const [error, documents] = await handle(
        Weapon.find({
            favorite: true,
        }, )
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving favorite char"
            )
        );
    }

    return res.send(documents);
};