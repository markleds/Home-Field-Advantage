const express = require("express");
const router = express.Router();

// Stadiums
router.use("/stadiums", require("./resources/stadiums"));
// Stadiums

// Stadiums -> Comments
router.use("/stadiums/:id/comments", require("./resources/stadiums/comments"));
// Stadiums -> Comments

module.exports = router;
