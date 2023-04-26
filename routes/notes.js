const express = require("express");
let router = express.Router();
const path = require("path");

// Since server.js has `app.use("/notes", notesRouter)`
// this route is the same as `router.get("/notes", (req, res) etc...`
router.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;