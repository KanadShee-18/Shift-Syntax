import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { LANGUAGES } from "../../../utils/contants/index";
import { Play } from "lucide-react";

const CodeShift = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    navigate("/sign-in", { replace: true });
  }

  const [code, setCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");

  const handleConvert = async () => {
    setConvertedCode("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/v1/chat/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Added token if backend requires authentication
        },
        body: JSON.stringify({
          sourceCode: code,
          sourceLang: "cpp", // Hardcoded; make dynamic if needed
          targetLang: "python", // Hardcoded; make dynamic if needed
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body received");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let buffer = "";
      let accumulatedCode = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunkValue = decoder.decode(value, { stream: true });
          buffer += chunkValue;

          // Split buffer by double newlines (SSE format)
          const lines = buffer.split("\n\n");

          // Process all complete lines except the last (which may be partial)
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();

            // Skip empty lines
            if (!line) continue;

            // Handle SSE event lines
            if (line.startsWith("event: done")) {
              done = true;
              break;
            }

            if (line.startsWith("data:")) {
              let data = line.replace("data:", "").trim();

              // Skip markdown delimiters or empty data
              if (!data || data === "```json" || data === "```") {
                continue;
              }

              // Accumulate valid data
              accumulatedCode += data + "\n";
              setConvertedCode(accumulatedCode);
            }
          }

          // Preserve the last partial chunk
          buffer = lines[lines.length - 1];
        }
      }

      // Clean up and attempt to parse JSON for pretty-printing
      if (accumulatedCode) {
        try {
          const parsedJson = JSON.parse(accumulatedCode.trim());
          setConvertedCode(JSON.stringify(parsedJson, null, 2));
        } catch (e) {
          console.warn("Failed to parse JSON, displaying raw output:", e);
          // Keep raw output if JSON parsing fails
          setConvertedCode(accumulatedCode.trim());
        }
      } else {
        setError("No valid code received from the server.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error in handleConvert:", error);
      setError(`Error: ${error.message || "Failed to convert code."}`);
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center w-full min-h-screen py-24 bg-gradient-to-br from-teal-950 via-slate-950 to-indigo-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-md shadow-slate-950 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 max-w-[1000px] relative md:mx-10 mx-5">
        {/* Code Input + Preview */}
        <div className="min-w-[300px] md:min-w-[370px] flex flex-col p-2 bg-white/10 rounded-lg shadow-slate-950 shadow-md min-h-full h-fit overflow-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="w-full mb-2">
                <Button
                  className={
                    "rounded-md w-full bg-gradient-to-r hover:bg-gradient-to-br from-slate-700 via-indigo-600 to-slate-800 shadow-md shadow-slate-950"
                  }
                >
                  {sourceLang ? sourceLang.toUpperCase() : "Select Language"}
                </Button>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-64 bg-[#0f131f] border-slate-700 text-slate-300 scrollbar-hide">
              <DropdownMenuLabel className="bg-gray-900 rounded-md shadow-sm shadow-slate-950 my-1 text-teal-400">
                Available Languages
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-500" />
              {LANGUAGES.map((lang, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    value={lang.value}
                    onClick={() => setSourceLang(lang.value)}
                    className="cursor-pointer group bg-background/5 hover:bg-background/10 my-1"
                  >
                    <span className="w-full h-fit flex items-center gap-2">
                      <Play className="size-3 group-hover:text-teal-400" />
                      <p className="group-hover:text-teal-400 group-hover:translate-x-1.5 duration-300 transition-all">
                        {lang.name}
                      </p>
                    </span>
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-1/2 p-2 mb-2 mt-5 rounded border-none focus-visible:ring-0 resize-none text-blue-200 font-mono text-sm shadow-md shadow-slate-950 scrollbar-hide max-h-[300px]"
          />
          <Button
            onClick={handleConvert}
            className="bg-gradient-to-r my-5 from-neutral-900 via-slate-800 to-indigo-950 text-teal-300 px-4 py-2 rounded mb-2 hover:bg-teal-700 disabled:bg-teal-400 cursor-pointer shadow-md shadow-slate-950 hover:scale-95 duration-300 transition-all hover:bg-gradient-to-br"
            disabled={loading || !code.trim() || (!sourceLang && !targetLang)}
          >
            {loading ? "Converting..." : "Convert Code"}
          </Button>
          {code.trim().length > 0 && (
            <div className="rounded bg-white/5 text-white p-2 overflow-auto scrollbar-hide max-h-[300px] mt-5">
              <p className="mb-2 font-bold text-teal-400 tracking-wider">
                Your Code:
              </p>
              <SyntaxHighlighter
                language={sourceLang.toLowerCase()}
                style={xonokai}
                showLineNumbers
                className={
                  "!font-mono !border-none !shadow-md shadow-slate-950"
                }
              >
                {code || "Enter code to preview..."}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Converted Code Output */}
        <div className="min-w-[300px] bg-white/5 p-2 rounded-lg shadow-md shadow-slate-950 min-h-full overflow-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className={"w-full"}>
              <span className="w-full mb-2">
                <Button
                  className={
                    "rounded-md w-full bg-gradient-to-r hover:bg-gradient-to-br from-slate-700 via-indigo-600 to-slate-800 shadow-md shadow-slate-950 tracking-wider drop-shadow-2xl"
                  }
                >
                  {targetLang
                    ? targetLang.toUpperCase()
                    : "Select Convertable Language"}
                </Button>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="h-64 bg-[#0f131f] border-slate-700 text-slate-300 scrollbar-hide">
              <DropdownMenuLabel className="bg-gray-900 rounded-md shadow-sm shadow-slate-950 my-1 text-teal-400">
                Convertable Languages
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-500" />
              {LANGUAGES.map((lang, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    value={lang.value}
                    onClick={() => setTargetLang(lang.value)}
                    className="cursor-pointer group bg-background/5 hover:bg-background/10 my-1"
                  >
                    <span className="w-full h-fit flex items-center gap-2">
                      <Play className="size-3 group-hover:text-teal-400" />
                      <p className="group-hover:text-teal-400 group-hover:translate-x-1.5 duration-300 transition-all">
                        {lang.name}
                      </p>
                    </span>
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {error ? (
            <div className="text-rose-500 font-mono text-sm p-2">{error}</div>
          ) : (
            <>
              <p className="mb-2 mt-5 font-bold text-teal-400 tracking-wider">
                Converted Code:
              </p>
              <SyntaxHighlighter
                language={targetLang.toLowerCase()}
                style={xonokai}
                showLineNumbers
                className="!border-none !font-mono"
              >
                {convertedCode ||
                  (loading
                    ? "Waiting for response..."
                    : "Converted Code will appear here.")}
              </SyntaxHighlighter>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeShift;
