import Footer from "../components/hero-section/Footer";
import {
  Code2,
  Users,
  Shield,
  Zap,
  Heart,
  Globe,
  LogOutIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <div className="w-full mx-auto z-[999] fixed top-0">
        <div className="flex justify-between bg-[#ffffff1f] rounded-full px-5 backdrop-blur-md mx-auto p-2 w-full max-w-[1200px]">
          <div className="bg-background p-2 rounded-full shadow-sm shadow-slate-400">
            <Link to={"/"}>
              <img src="/logo.png" alt="Logo" className="w-7" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={"/"}
              className={
                "group flex items-center rounded-md text-sm bg-gradient-to-br hover:bg-gradient-to-bl from-teal-600 via-indigo-700 to-slate-700 hover:scale-[0.97] px-5 h-full duration-300 transition-all gap-3 text-white"
              }
            >
              <LogOutIcon className="group-hover:translate-x-1 duration-200 transition-all rotate-180 size-5" />
              <p className="group-hover:-translate-x-1 duration-200 transition-all">
                Back to Home
              </p>
            </Link>
          </div>
        </div>
      </div>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-20">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-2xl mr-4">
                <Code2 className="size-6 md:size-12 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
                About FormatFlow
              </h1>
            </div>
            <p className="text-sm sm:text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to simplify code conversion and make
              developers' lives easier. FormatFlow was born from the everyday
              frustration of switching between different data formats.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto">
              To provide the fastest, most secure, and most reliable code
              conversion tools that developers trust for their daily workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 group hover:shadow-lg shadow-slate-300 transition-all duration-200">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-all duration-200">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Speed First
              </h3>
              <p className="text-slate-600">
                Lightning-fast conversions that don't interrupt your development
                flow. Every millisecond counts when you're in the zone.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 group hover:shadow-lg shadow-slate-300 transition-all duration-200">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-all duration-200">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Privacy Protected
              </h3>
              <p className="text-slate-600">
                Your code never leaves your browser. All conversions happen
                locally, ensuring your intellectual property stays secure.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 group hover:shadow-lg shadow-slate-300 transition-all duration-200">
              <div className="p-3 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl w-fit mx-auto mb-6 group-hover:scale-110 transition-all duration-200">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Developer Love
              </h3>
              <p className="text-slate-600">
                Built by developers, for developers. We understand the pain
                points and craft solutions that feel intuitive and powerful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-transparent bg-gradient-to-bl from-slate-400 to-indigo-950 bg-clip-text mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  FormatFlow started as a weekend project when our founder got
                  tired of manually converting JSON to YAML for the hundredth
                  time. What began as a simple script grew into a comprehensive
                  conversion platform.
                </p>
                <p>
                  We believe that repetitive tasks should be automated, complex
                  processes should be simplified, and developers should focus on
                  what they do best: building amazing software.
                </p>
                <p>
                  Today, FormatFlow serves thousands of developers worldwide,
                  processing millions of conversions while maintaining our core
                  principles of speed, security, and simplicity.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
              <div className="text-center mb-8">
                <div className="p-4 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-2xl w-fit mx-auto mb-4">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Global Impact
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    500K+
                  </div>
                  <div className="text-slate-600">Conversions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    50K+
                  </div>
                  <div className="text-slate-600">Developers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">
                    100+
                  </div>
                  <div className="text-slate-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-600 mb-2">
                    24/7
                  </div>
                  <div className="text-slate-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision
              we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 hover:shadow-lg shadow-slate-300 transition-all duration-200 rounded-2xl">
              <div className="p-3 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl w-fit mx-auto mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Community First
              </h3>
              <p className="text-slate-600 text-sm">
                We listen to our users and build features that solve real
                problems.
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg shadow-slate-300 transition-all duration-200 rounded-2xl">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl w-fit mx-auto mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Security Always
              </h3>
              <p className="text-slate-600 text-sm">
                Your data security is never negotiable. Privacy by design,
                always.
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg shadow-slate-300 transition-all duration-200 rounded-2xl">
              <div className="p-3 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl w-fit mx-auto mb-4">
                <Zap className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Constant Innovation
              </h3>
              <p className="text-slate-600 text-sm">
                We're always pushing boundaries to make development tools
                better.
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-lg shadow-slate-300 transition-all duration-200 rounded-2xl">
              <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl w-fit mx-auto mb-4">
                <Heart className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Quality Obsessed
              </h3>
              <p className="text-slate-600 text-sm">
                Every feature is crafted with attention to detail and user
                experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
