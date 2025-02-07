const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  saveNote,
  listNotes,
  renderNote,
} = require("../controllers/noteController");
const { checkNoteGrammar } = require("../controllers/grammarController");

// Protect all note routes
router.use(protect);

router.post("/", upload.single("file"), saveNote);
router.get("/", listNotes);
router.get("/:id/render", renderNote);
router.post("/check-grammar", checkNoteGrammar);

module.exports = router;
