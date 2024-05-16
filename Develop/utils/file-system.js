const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db", "db.json");

const readNotesDb = async () => {
  // read the data
  const content = await readFile(dbPath, "utf-8");
  // parse the data
  const notes = JSON.parse(content);

  return notes;
};

const writeNotesDb = async (notes) => {
  // stringify data and save to file
  return await writeFile(dbPath, JSON.stringify(notes));
};

module.exports = { readNotesDb, writeNotesDb };
