import React, { useState, useRef } from "react";
import {
  Copy,
  Download,
  RefreshCw,
  Code,
  ArrowRight,
  X,
  CheckCheckIcon,
  ArrowRightLeftIcon,
  OctagonXIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Editor from "@monaco-editor/react";
import { BASE_URL } from "../../../utils/url";
import { languages } from "../../../utils/contants";

const CodeShift = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");
  const [targetExtension, setTargetExtension] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const readerRef = useRef(null);

  const customStyle = {
    ...oneLight,
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: "16px", // optional
    },
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      fontFamily: '"JetBrains Mono", monospace',
    },
  };

  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      setError("Please enter some code to convert");
      return;
    }

    setIsConverting(true);
    setError("");
    setConvertedCode("");
    setStreamingText("");

    try {
      const response = await fetch(`${BASE_URL}/api/v1/chat/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: sourceCode,
          sourceLang,
          targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder();

      let buffer = "";
      let fullCode = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);

              switch (data.type) {
                case "chunk":
                  fullCode += data.data;
                  setStreamingText(fullCode);
                  break;

                case "complete":
                  // setConvertedCode(data.data);
                  setConvertedCode(cleanCodeBlock(data.data));
                  setStreamingText("");
                  break;

                case "error":
                  setError(data.error);
                  break;
              }
            } catch (parseError) {
              console.error("Error parsing JSON:", parseError);
            }
          }
        }
      }
    } catch (error) {
      setError("Failed to convert code: " + error.message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleStop = () => {
    if (readerRef.current) {
      readerRef.current.cancel();
      readerRef.current = null;
    }
    setIsConverting(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 4000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadCode = (code, filename) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearCode = () => {
    setSourceCode("");
    setConvertedCode("");
    setStreamingText("");
    setError("");
  };

  function cleanCodeBlock(code) {
    return code
      .replace(/^```\w*\n?/, "")
      .replace(/\n?```$/, "")
      .trim();
  }

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    const tempCode = sourceCode;
    setSourceCode(convertedCode || streamingText);
    setConvertedCode(tempCode);
    setStreamingText("");
  };

  const displayCode = streamingText || convertedCode;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-24">
      <div className="fixed inset-0 z-0 bg-[#effffe8f] bg-[radial-gradient(#dae0df_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-teal-400 to-slate-700 opacity-80 blur-[190px]"></div>
        <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-teal-400 to-slate-700 blur-[190px] opacity-80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-[50]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="md:text-4xl text-3xl font-bold text-transparent bg-gradient-to-r from-teal-400 via-slate-900 to-cyan-500 bg-clip-text mb-2">
            Convert Your Code with Ease
          </h1>
          <p className="text-gray-600 md:text-lg text-sm">
            Convert code between different programming languages using AI
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center">
            <X className="size-6 p-1 bg-rose-500 text-white rounded-full shadow-sm shadow-slate-700" />
            <div className="ml-3">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Copy Success Alert */}
        {copySuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center">
            <CheckCheckIcon className="size-6 p-1 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-700" />
            <div className="ml-3">
              <p className="text-green-700 font-medium">
                Code Copied to Clipboard!
              </p>
            </div>
          </div>
        )}

        {/* Buttons to Control */}
        <div className="my-8 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleConvert}
              disabled={isConverting || !sourceCode.trim()}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-600 via-indigo-950 to-teal-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all ease-out shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {isConverting ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <Code size={20} />
                  <span>Convert Code</span>
                  <ArrowRight size={20} />
                </>
              )}
            </Button>

            <Button
              onClick={swapLanguages}
              disabled={isConverting}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
              title="Swap languages"
            >
              <ArrowRightLeftIcon />
              <span>Swap</span>
            </Button>

            {isConverting && (
              <Button
                onClick={handleStop}
                className="flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-md hover:shadow-lg"
              >
                <OctagonXIcon />
                <span>Stop</span>
              </Button>
            )}
          </div>

          {/* Progress Indicator */}
          {isConverting && (
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">
                {streamingText
                  ? "Receiving response..."
                  : "Connecting to AI..."}
              </div>
              <div className="w-64 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full animate-pulse"
                  style={{ width: streamingText ? "75%" : "25%" }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Code Panel */}
          <div className="bg-transparent backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-4 gap-y-2 md:gap-y-0">
                <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-teal-600 to-indigo-950 bg-clip-text flex items-center">
                  <Code className="mr-2 text-teal-600" size={20} />
                  Source Code
                </h2>
                <div className="flex items-center space-x-2">
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Source Language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-96">
                      <SelectGroup>
                        <SelectLabel>Available Languages</SelectLabel>
                        {languages.map((lang) => (
                          <SelectItem key={lang.label} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <button
                    onClick={clearCode}
                    className="px-3 md:block hidden py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                    disabled={isConverting}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <Editor
                // height="400px"
                language={sourceLang.toLowerCase()}
                value={sourceCode}
                onChange={(value) => setSourceCode(value || "")}
                theme="vs-light" // or "light"
                options={{
                  fontSize: 16,
                  fontFamily:
                    'JetBrains Mono, Monaco, Consolas, "Courier New", monospace',
                  lineNumbers: "on",
                  wordWrap: "on",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  readOnly: isConverting,
                }}
                className="!scrollbar-hide !focus:outline-none !h-[200px] md:!h-[400px]"
              />
            </div>
          </div>

          {/* Converted Code Panel */}
          <div className="bg-transparent backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-4 gap-y-2 md:gap-y-0">
                <h2 className="text-xl font-semibold text-transparent bg-gradient-to-l from-teal-600 to-indigo-950 bg-clip-text flex items-center">
                  <ArrowRight className="mr-2 text-indigo-900" size={20} />
                  Converted Code
                </h2>
                <div className="flex items-center space-x-2">
                  <Select
                    value={targetLang}
                    onValueChange={(value) => {
                      setTargetLang(value);
                      const selected = languages.find(
                        (lang) => lang.value === value
                      );
                      setTargetExtension(selected?.extension || "txt");
                    }}
                  >
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Target Language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-96">
                      <SelectGroup>
                        <SelectLabel>Available Languages</SelectLabel>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {displayCode && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(displayCode)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        title="Copy code"
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        onClick={() =>
                          downloadCode(
                            displayCode,
                            `converted.${targetExtension}`
                          )
                        }
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        title="Download code"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <SyntaxHighlighter
                  language={targetLang.toLowerCase()}
                  // lineProps={{
                  //   style: { whiteSpace: "pre-wrap" },
                  // }}
                  style={customStyle}
                  wrapLongLines={true}
                  wrapLines={true}
                  showLineNumbers
                  className="!border-none !font-mono !h-[200px] md:!h-[400px] scrollbar-hide shadow-sm shadow-slate-400"
                >
                  {displayCode ||
                    (isConverting
                      ? "Waiting for response..."
                      : "Converted Code will appear here.")}
                </SyntaxHighlighter>

                {isConverting && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <RefreshCw size={12} className="animate-spin mr-1" />
                      Converting...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Powered by Google Gemini AI • Built with MERN Stack</p>
        </div>
      </div>
    </div>
  );
};

export default CodeShift;
