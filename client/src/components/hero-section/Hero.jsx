import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <div className="absolute inset-0 h-[75%] w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-teal-100/40 to-indigo-100/40 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-rose-100/40 to-teal-100/40 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="absolute w-[150px] md:w-[250px] h-[150px] md:h-[250px] rounded-4xl blur-[100px] aspect-square bg-gradient-to-br from-indigo-500 via-teal-600 to-slate-600 opacity-60 top-28 left-0" />
        <div className="absolute w-[150px] md:w-[250px] h-[150px] md:h-[250px] rounded-4xl blur-[100px] aspect-square bg-gradient-to-br from-indigo-500 via-teal-600 to-slate-600 opacity-60 bottom-0 right-0" />
        <div className="text-center mt-10">
          {/* Main heading */}
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-teal-800 bg-clip-text text-transparent">
              Convert Code Formats With
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
              SyntaxShift
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-semibold">
            Transform your code between formats instantly. JSON to YAML, CSV to
            JSON, and dozens more conversions with enterprise-grade accuracy and
            privacy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12 group hover:scale-[0.97]"
            >
              Start Converting
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 duration-300 transition-all" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 text-sm text-slate-500">
            <p className="mb-4">Trusted by developers worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <span className="font-mono">100% Privacy</span>
              <span>•</span>
              <span className="font-mono">Instant Results</span>
              <span>•</span>
              <span className="font-mono">50+ Formats</span>
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            <img src="/code.png" alt="code" className="w-full md:w-3/4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
