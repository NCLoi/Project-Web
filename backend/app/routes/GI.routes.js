const express = require("express");
const GI = require("../controllers/GI.controller");
//const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    //router.use(middlewares.verifyToken);

    router.post("/", GI.create);
    router.get("/", GI.findAll);
    router.get("/:id", GI.findOne);
    router.put("/:id", GI.update);
    router.delete("/:id", GI.delete);
    router.delete("/", GI.deleteAll);

    app.use("/api/GI", router);
};