const fs = require("fs").promises;
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.parseFile = async (filePath, fileType) => {
  try {
    if (fileType === "pdf") {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else if (fileType === "docx" || fileType === "doc") {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else if (fileType === "pptx" || fileType === "ppt") {
      // For PPTX, you'd need additional library
      // This is a placeholder - implement based on your needs
      return "PPTX parsing not fully implemented";
    }
  } catch (error) {
    throw new Error("File parsing failed: " + error.message);
  }
};
