const router = require("express").Router();
const savedRoutes = require("./saved");
const scimuse = require('./scimuse')
const wiki = require('./wiki')

router.use("/saved", savedRoutes);
router.use("/scimuse", scimuse);
router.use('/wiki', wiki)
module.exports = router;
