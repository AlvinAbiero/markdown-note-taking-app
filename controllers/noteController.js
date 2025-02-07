const Note = require("../models/noteModel");
const { parseMarkdown } = require("../utils/markdownParser");

// Save a note
const saveNote = async (req, res) => {
  const { title, content } = req.body;
  const renderedContent = parseMarkdown(content);

  try {
    if (!title || !content)
      return res.status(400).json({
        success: false,
        error: "Title and content are required",
      });
    const note = new Note({
      title,
      content,
      renderedContent,
      user: req.user._id,
    });
    await note.save();

    res.status(201).json({
      success: true,
      message: "Note saved successfully",
      note: {
        id: note._id,
        title: note.title,
        renderedContent: note.renderedContent,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving note",
      error: error.message,
    });
  }
};

// List all notes
const listNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.staus(200).json(notes);
  } catch (error) {
    res.json(500).json({
      success: false,
      error: "Failed to fetch notes",
    });
  }
};

// Render markdown to HTML
const renderNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({
      _id: id,
      user: req.user._id,
    });
    if (!note)
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    const htmlContent = parseMarkdown(note.content);
    res.status(200).send(htmlContent);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to render note",
    });
  }
};

module.exports = { saveNote, listNotes, renderNote };
