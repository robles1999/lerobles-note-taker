const express = require("express");
const app = new express();
const notesRouter = require("./routes/notes");
const apiRouter = require("./routes/api");

const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use("/notes", notesRouter)
app.use("/api", apiRouter)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
