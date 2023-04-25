const express = require("express");
const app = new express();
const path = require("path");
const fs = require("fs");
const notes = require("./Develop/db/db.json");

// Module to generate random id's
const crypto = require("crypto");

const PORT = 3000;

app.use(express.static(path.join(__dirname, "Develop/public")));
app.use(express.json());

// Render all notes
app.get("/notes", (req, res) => {
  //!   res.sendFile("notes.html"); <== Public path doesn't work
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

// Render all notes in JSON format
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// Add new note to the db.json file with a unique id
app.post("/api/notes", (req, res) => {
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
  //! Can this fs.writeFile be set as a middleware or a function
  //! so it can be used to write to file on line 68 as well?
  fs.writeFile(
    path.join(__dirname, "Develop/db/db.json"),
    JSON.stringify(notes),
    (err) => {
      if (err) throw err;
      res.send("Note added.");
    }
  );
});

// Delete note based on the note id passed in
app.delete("/api/notes/:id", (req, res) => {
  console.log("Notes:", notes);
  const itemIndex = notes.findIndex((i) => i.id === req.params.id);

  console.log("item index:", itemIndex);

  if (itemIndex >= 0) {
    notes.splice(itemIndex, 1);
  }

  // Write the updated object back to the file
  fs.writeFile(
    path.join(__dirname, "Develop/db/db.json"),
    JSON.stringify(notes),
    (err) => {
      if (err) throw err;
      res.send("Item deleted.");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});