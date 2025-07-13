import React, { useState, useRef } from "react";
import {
  Copy,
  Download,
  RefreshCw,
  Code,
  ArrowRight,
  X,
  CheckCheckIcon,
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
import { useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeShift = () => {
  const [sourceCode, setSourceCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const readerRef = useRef(null);

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "yaml", label: "YAML" },
    { value: "json", label: "JSON" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "typescript", label: "TypeScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
    { value: "r", label: "R" },
    { value: "scala", label: "Scala" },
    { value: "perl", label: "Perl" },
  ];

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
      const response = await fetch("http://localhost:4000/api/v1/chat/query", {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-teal-400 via-slate-900 to-indigo-900 bg-clip-text mb-2">
            AI Code Converter
          </h1>
          <p className="text-gray-600 text-lg">
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Code Panel */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Code className="mr-2" size={20} />
                  Source Code
                </h2>
                <div className="flex items-center space-x-2">
                  {/* <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isConverting}
                  >
                    {languages.map((lang) => (
                      <option
                        key={lang.value}
                        value={lang.value}
                        className="px-2 py-1 !border-b-2"
                      >
                        {lang.label}
                      </option>
                    ))}
                  </select> */}

                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Source Language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-96">
                      <SelectGroup>
                        <SelectLabel>Available Languages</SelectLabel>
                        {languages.map((lang) => (
                          <SelectItem
                            value={lang.value}
                            setSourceLang={lang.value}
                          >
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <button
                    onClick={clearCode}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                    disabled={isConverting}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Enter your code here..."
                className="w-full scrollbar-hide h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-gray-50"
                disabled={isConverting}
              />
            </div>
          </div>

          {/* Converted Code Panel */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <ArrowRight className="mr-2" size={20} />
                  Converted Code
                </h2>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Target Language" />
                    </SelectTrigger>
                    <SelectContent className="max-h-96">
                      <SelectGroup>
                        <SelectLabel>Available Languages</SelectLabel>
                        {languages.map((lang) => (
                          <SelectItem
                            value={lang.value}
                            setTargetLang={lang.value}
                          >
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
                          downloadCode(displayCode, `converted.${targetLang}`)
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
                {/* <textarea
                  value={displayCode}
                  readOnly
                  placeholder={
                    isConverting
                      ? "Converting..."
                      : "Converted code will appear here..."
                  }
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 resize-none"
                /> */}

                <SyntaxHighlighter
                  language={targetLang.toLowerCase()}
                  lineProps={{
                    style: { whiteSpace: "pre-wrap" },
                  }}
                  style={customStyle}
                  wrapLongLines={true}
                  wrapLines={true}
                  showLineNumbers
                  className="!border-none !font-mono !h-96 scrollbar-hide"
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

        {/* Control Panel */}
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleConvert}
              disabled={isConverting || !sourceCode.trim()}
              className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
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
            </button>

            <button
              onClick={swapLanguages}
              disabled={isConverting}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
              title="Swap languages"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span>Swap</span>
            </button>

            {isConverting && (
              <button
                onClick={handleStop}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Stop</span>
              </button>
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
                  className="bg-blue-600 h-2 rounded-full animate-pulse"
                  style={{ width: streamingText ? "75%" : "25%" }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Powered by Google Gemini AI • Built with React & Node.js</p>
        </div>
      </div>
    </div>
  );
};

export default CodeShift;
