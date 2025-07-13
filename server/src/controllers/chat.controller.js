import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);

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
