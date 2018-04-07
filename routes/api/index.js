const router = require("express").Router();
const savedRoutes = require("./saved");
const scimuse = require('./scimuse')

router.use("/saved", savedRoutes);
router.use("/scimuse", scimuse);

module.exports = router;
