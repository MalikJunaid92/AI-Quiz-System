const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateMCQs = async (content, numberOfQuestions = 10) => {
  const prompt = `
Generate ${numberOfQuestions} multiple choice questions from the following content.

Content:
${content}

Requirements:
- Each question must have exactly 4 options
- Each question must have exactly 1 correct answer
- Make questions educational and test understanding
- Return response in valid JSON format only

Format your response as a JSON array like this:
[
  {
    "questionText": "Question here?",
    "options": [
      {"text": "Option 1", "isCorrect": false},
      {"text": "Option 2", "isCorrect": true},
      {"text": "Option 3", "isCorrect": false},
      {"text": "Option 4", "isCorrect": false}
    ]
  }
]
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;

    // Extract JSON from response
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid AI response format");
    }

    const questions = JSON.parse(jsonMatch[0]);
    return questions;
  } catch (error) {
    throw new Error("AI generation failed: " + error.message);
  }
};
