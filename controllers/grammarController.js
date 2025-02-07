const { checkGrammar } = require("../utils/grammarChecker");

const checkNoteGrammar = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const errors = await checkGrammar(content);
    res.status(200).json({ errors });
  } catch (error) {
    res.status(500).json({ error: "Failed to check grammar" });
  }
};

module.exports = { checkNoteGrammar };
