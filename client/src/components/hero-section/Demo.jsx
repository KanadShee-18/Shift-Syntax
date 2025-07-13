import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  const jsonInput = `{
  "name": "John Doe",
  "age": 30,
  "skills": ["JavaScript", "Python", "Go"],
  "active": true
}`;

  const yamlOutput = `name: John Doe
age: 30
skills:
  - JavaScript
  - Python
  - Go
active: true`;

  return (
    <section className="py-20 lg:py-48 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-br from-slate-400 to-indigo-950 bg-clip-text mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Watch how easily you can convert between different code formats
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Input */}
          <Card className="relative overflow-hidden border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  Input (JSON)
                </span>
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-0">
              <pre className="p-6 text-sm font-mono text-slate-800 bg-slate-50/50 overflow-x-auto">
                {jsonInput}
              </pre>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="grid place-items-center">
            <div className="p-4 w-fit bg-gradient-to-r from-teal-500 to-indigo-600 rounded-full shadow-lg flex items-center justify-center">
              <ArrowRight className="w-8 h-8 rotate-[90deg] lg:rotate-0 text-white" />
            </div>
          </div>

          {/* Output */}
          <Card className="relative overflow-hidden border-2 border-teal-200 shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-full">
            <div className="bg-gradient-to-r from-teal-100 to-indigo-50 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">
                  Output (YAML)
                </span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-0">
              <pre className="p-6 text-sm font-mono text-slate-800 bg-gradient-to-br from-teal-50/50 to-indigo-50/50 overflow-x-auto">
                {yamlOutput}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link to={"/code-shift"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try It Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Demo;
