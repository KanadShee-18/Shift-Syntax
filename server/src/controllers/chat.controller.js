import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);

export const generateChat = async (req, res) => {
  console.log("Incoming request to /api/v1/chat/query");

  try {
    const { sourceCode, sourceLang, targetLang } = req.body;

    if (!sourceCode || !sourceLang || !targetLang) {
      return res.status(400).json({
        success: false,
        message: "sourceCode, sourceLang, and targetLang are required",
      });
    }
    // console.log("Query is: ", query);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    console.log("model created");

    const prompt = `
You are an expert code converter.

Your task is to convert the following code written in ${sourceLang} to ${targetLang} with zero loss of meaning, logic, or formatting.

🟢 Strict Guidelines:
1. Preserve all nested structures and key-value pairs exactly as in the original.
2. Maintain proper indentation and spacing as per ${targetLang} syntax.
3. Do **not explain** or comment anything — only return pure converted code.
4. If converting from JSON or JS object → YAML, make sure:
   - Booleans, numbers, arrays, and nested objects are retained correctly.
   - Strings with special characters are quoted properly.
5. If converting from YAML → JSON or JS:
   - Use proper double quotes for keys and strings.
   - Retain array and object depth faithfully.
6. Do **not** add any extra headers like \`---\` or \`yaml:\` unless explicitly present in the source.
7. Do **not** summarize, prefix, or suffix the output. Only pure converted code.

Here is the input to convert:

--- START OF INPUT CODE (${sourceLang}) ---
${sourceCode}
--- END OF INPUT CODE ---

🟡 Output only the ${targetLang} code.
`;

    const result = await model.generateContentStream(prompt);

    console.log("Result from gemini: ", result);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      console.log("Streaming text ..... ", text);

      res.write(`data:${text}\n\n`);
      // res.write(`data:${text.replace(/\n/g, "\\n")}\n\n`);
    }
    res.write(`event: done\ndata: end\n\n`);
    res.end();
  } catch (error) {
    console.log("Error coming in chat as", error);

    return res.status(500).json({
      success: false,
      message: "Some internal problem occurred whlile generating chat",
      error: error.message ?? "Some error occurred in server!",
    });
  }
};
