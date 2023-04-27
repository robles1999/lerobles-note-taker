const express = require("express");
let router = express.Router();
const crypto = require("crypto");
const notes = require("../db/db.json");
const writeToDb = require("../helpers/writeFiles");

// Since server.js has `app.use("/api", apiRouter)`
// this route is the same as `router.get("/api/notes", (req, res) etc...`
router.get("/notes", (req, res) => {
  res.json(notes);
});

// Add new note to the db.json file with a unique id
router.post("/notes", (req, res) => {

  // Generate a unique id
  const id = crypto.randomBytes(16).toString("hex");

  // Add a new object to the array
  const newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
  };

  notes.push(newNote);

  // Helper fn to write to db.json
  writeToDb(notes, req, res);
});

// Delete note based on the note id passed in
router.delete("/notes/:id", (req, res) =>
{
  // Find the index of the note with the passed in id
  const itemIndex = notes.findIndex((i) => i.id === req.params.id);

  console.log("item index:", itemIndex);

  // Remove the item from the notes array
  if (itemIndex >= 0) {
    notes.splice(itemIndex, 1);
  }

  // Helper fn to write to db.json
  writeToDb(notes, req, res);
});

module.exports = router;
