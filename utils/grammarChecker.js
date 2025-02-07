const axios = require("axios");

const LANUAGE_TOOL_API_URL = "https://api.languagetoolplus.com/v2/check";

const checkGrammar = async (text) => {
  try {
    const response = await axios.post(LANUAGE_TOOL_API_URL, {
      text,
      language: "en-GB",
    });

    // Extract grammar errors from the response
    const errors = response.data.matches.map((match) => ({
      message: match.message,
      shortMessage: match.shortMessage,
      replacements: match.replacements,
      offset: match.offset,
      length: match.length,
    }));

    return errors;
  } catch (error) {
    console.error("Error checking grammar:", error);
    throw new Error("Failed to check grammar");
  }
};

module.exports = { checkGrammar };
