import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Globe, Code } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Convert your code formats in milliseconds. No waiting, no delays - just instant results that keep your workflow moving.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description:
        "Your code never leaves your browser. All conversions happen locally, ensuring complete privacy and security.",
    },
    {
      icon: Globe,
      title: "50+ Formats",
      description:
        "From JSON to YAML, CSV to XML, and everything in between. We support all the formats developers need.",
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description:
        "Built by developers, for developers. Clean interface, keyboard shortcuts, and seamless integration options.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-bl from-slate-400 to-indigo-950 bg-clip-text mb-4">
            Why Choose Our Converter?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful features designed to make code format conversion effortless
            and secure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/50 via-indigo-200/50 to-rose-200/50 rounded-lg blur-sm group-hover:blur-md transition-all duration-500"></div>
              <div className="relative bg-white m-0.5 rounded-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
