const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readNotesDb, writeNotesDb } = require("../../utils/file-system");

// get notes
router.get("/notes", async (req, res) => {
  const notes = await readNotesDb();
  res.json(notes);
});

// post new note
router.post("/notes", async (req, res) => {
  const newNote = {
    id: uuidv4(),
    ...req.body,
  };

  const notes = await readNotesDb();

  notes.push(newNote);

  await writeNotesDb(notes);

  res.status(201).json(newNote);
});

// delete note
router.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await readNotesDb();

  const filteredNotes = notes.filter((notes) => notes.id !== id);

  await writeNotesDb(filteredNotes);

  res.status(200).send("Successfully deleted");
});

module.exports = router;
