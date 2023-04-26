const express = require("express");
const app = new express();
const notesRouter = require("./routes/notes");
const apiRouter = require("./routes/api");
const path = require("path");

const PORT = process.env.PORT || 3000;

//::::: Middleware and Routes ::::::
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/notes", notesRouter);
app.use("/api", apiRouter);

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
