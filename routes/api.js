const express = require("express");
const fs = require("fs");
let router = express.Router();
const path = require("path");
const crypto = require("crypto");
const notes = require("../db/db.json");


router.get("/notes", (req, res) => {
  res.json(notes);
});

// Add new note to the db.json file with a unique id
router.post("/notes", (req, res) => {
  console.log(req.body);
  console.log("Notes", notes);

  // Generate a unique id
  const id = crypto.randomBytes(16).toString("hex");

  // Add a new object to the array
  const newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
  };

  notes.push(newNote);

  // Write the updated object back to the file
  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes),
    (err) => {
      if (err) throw err;
      res.send("Note added.");
    }
  );
});

// Delete note based on the note id passed in
router.delete("/notes/:id", (req, res) => {
  console.log("Notes:", notes);
  const itemIndex = notes.findIndex((i) => i.id === req.params.id);

  console.log("item index:", itemIndex);

  if (itemIndex >= 0) {
    notes.splice(itemIndex, 1);
  }

  // Write the updated object back to the file
  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes),
    (err) => {
      if (err) throw err;
      res.send("Item deleted.");
    }
  );
});

module.exports = router;
