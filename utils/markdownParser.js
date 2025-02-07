const marked = require("marked");

const parseMarkdown = (markdown) => {
  return marked.parse(markdown);
};

module.exports = { parseMarkdown };
