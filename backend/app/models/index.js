const mongoose = require("mongoose");
const createGIModel = require("./GI.model");
const createUserModel = require("./user.model");
const createWeaponModel = require("./weapon.model");

const db = {};
db.mongoose = mongoose;
db.GI = createGIModel(mongoose);
db.Weapon = createWeaponModel(mongoose);
db.User = createUserModel(mongoose);

module.exports = db;