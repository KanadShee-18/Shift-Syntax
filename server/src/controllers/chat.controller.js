import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);

// export const generateChat = async (req, res) => {
//   console.log("Incoming request to /api/v1/chat/query");

//   try {
//     const { sourceCode, sourceLang, targetLang } = req.body;

//     if (!sourceCode || !sourceLang || !targetLang) {
//       return res.status(400).json({
//         success: false,
//         message: "sourceCode, sourceLang, and targetLang are required",
//       });
//     }
//     // console.log("Query is: ", query);
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");

//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
//     console.log("model created");

//     const prompt = `
// You are an expert code converter.

// Your task is to convert the following code written in ${sourceLang} to ${targetLang} with zero loss of meaning, logic, or formatting. No need to add and backticks or converted file name in top or bottom, just code.

// NOTE: Dont add backtick and converted file format name in top or bottom. Just return the code.

// Here is the input to convert:

// --- START OF INPUT CODE (${sourceLang}) ---
// ${sourceCode}
// --- END OF INPUT CODE ---

// 🟡 Output only the ${targetLang} code.
// `;

//     const result = await model.generateContentStream(prompt);

//     console.log("Result from gemini: ", result);

//     for await (const chunk of result.stream) {
//       const text = chunk.text();
//       console.log("Streaming text ..... ", text);

//       res.write(`data:${text}\n\n`);
//       // res.write(`data:${text.replace(/\n/g, "\\n")}\n\n`);
//     }
//     res.write(`event: done\ndata: end\n\n`);
//     res.end();
//   } catch (error) {
//     console.log("Error coming in chat as", error);

//     return res.status(500).json({
//       success: false,
//       message: "Some internal problem occurred whlile generating chat",
//       error: error.message ?? "Some error occurred in server!",
//     });
//   }
// };

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

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no"); // Disable buffering for Nginx

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    console.log("model created");

    const prompt = `You are an expert code converter.

Your task is to convert the following code written in ${sourceLang} to ${targetLang} with zero loss of meaning, logic, or formatting. 

IMPORTANT:
1. Return ONLY the converted code, no explanations or additional text.
2. Preserve all original formatting, indentation, and comments.
3. Do not wrap the code in markdown backticks or add any file names.

Here is the input to convert:

--- START OF INPUT CODE (${sourceLang}) ---
${sourceCode}
--- END OF INPUT CODE ---

Output ONLY the ${targetLang} code:
`;

    const result = await model.generateContentStream(prompt);

    // Stream the response
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      // Send each chunk as an SSE message
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }

    // Send completion event
    res.write(`event: end\ndata: {"status": "complete"}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error in generateChat:", error);

    // Send error as SSE if connection is still open
    if (!res.headersSent) {
      res.write(
        `event: error\ndata: ${JSON.stringify({
          error: error.message || "Internal server error",
        })}\n\n`
      );
    }
    res.end();
  }
};

export const convertCode = async (req, res) => {
  console.log("Req coming in backend!");
  try {
    const { code, sourceLang, targetLang } = req.body;
    if (!code || !sourceLang || !targetLang) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields: code, sourceLang, targetLang so recheck",
      });
    }

    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    });

    // Create the prompt for Gemini
    const prompt = `Convert the following ${sourceLang} code to ${targetLang}. 
    Only return the converted code without any explanations or markdown formatting.
    
    Source code (${sourceLang}):
    ${code}
    
    Convert to ${targetLang}:`;

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    // Generate content with streaming
    const result = await model.generateContentStream(prompt);

    let fullResponse = "";

    // Process each chunk
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;

      // Send chunk to frontend
      res.write(
        JSON.stringify({
          type: "chunk",
          data: chunkText,
          partial: fullResponse,
        }) + "\n"
      );
    }

    // Send completion signal
    res.write(
      JSON.stringify({
        type: "complete",
        data: fullResponse,
      }) + "\n"
    );

    res.end();
    console.log("Full Response: ", fullResponse);
  } catch (error) {
    console.error("Error converting code:", error);

    // Send error to frontend
    res.write(
      JSON.stringify({
        type: "error",
        error: error.message,
      }) + "\n"
    );

    res.end();
  }
};
