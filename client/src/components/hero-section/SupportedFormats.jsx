import { Card, CardContent } from "@/components/ui/card";

const SupportedFormats = () => {
  const formats = [
    { name: "JSON", color: "from-yellow-400 to-orange-500" },
    { name: "YAML", color: "from-red-400 to-pink-500" },
    { name: "XML", color: "from-green-400 to-teal-500" },
    { name: "CSV", color: "from-blue-400 to-indigo-500" },
    { name: "TOML", color: "from-purple-400 to-indigo-500" },
    { name: "SQL", color: "from-teal-400 to-cyan-500" },
    { name: "Markdown", color: "from-gray-400 to-slate-500" },
    { name: "HTML", color: "from-orange-400 to-red-500" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Supported Formats
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Convert between all popular data and code formats with perfect
            accuracy
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {formats.map((format, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-slate-200 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${format.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-white font-bold text-sm">
                    {format.name.slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">
                  {format.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500 text-lg">
            ...and many more formats supported
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportedFormats;
