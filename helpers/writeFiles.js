const fs = require("fs");
const path = require("path");

function writeToDb(notes, req, res) {
  fs.writeFile(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notes),
    (err) => {
      if (err) throw err;
      res.send("Note added.");
    }
  );
}

module.exports = writeToDb;
