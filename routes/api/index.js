const router = require("express").Router();
const savedRoutes = require("./saved");


router.use("/saved", savedRoutes);

module.exports = router;
