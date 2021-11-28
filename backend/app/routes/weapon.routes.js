const express = require("express");
const Weapon = require("../controllers/weapon.controller");
//const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    //router.use(middlewares.verifyToken);

    router.post("/", Weapon.create);
    router.get("/", Weapon.findAll);

    router.get("/:id", Weapon.findOne);
    router.put("/:id", Weapon.update);
    router.delete("/:id", Weapon.delete);
    router.delete("/", Weapon.deleteAll);

    app.use("/api/weapon", router);
};