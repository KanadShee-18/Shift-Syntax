import { Route, Routes } from "react-router-dom";
import HomeSection from "./components/HeroSection";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
import { Toaster } from "sonner";
// import CodeShift from "./components/codeConvert/CodeShift";
import { Loader2Icon } from "lucide-react";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

const About = lazy(() => import("./components/About"));
const SignUp = lazy(() => import("./components/SignUp"));
const SignIn = lazy(() => import("./components/SignIn"));
const CodeShift = lazy(() => import("./components/codeConvert/CodeShift"));

const App = () => {
  return (
    <div className="selection:bg-primary/30">
      <Navbar />
      <Suspense
        fallback={
          <div className="grid h-[60vh] place-items-center">
            <Loader2Icon className="animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/about" element={<About />} />
          {/* <Route
            path="/sign-in"
            element={
              <OpenRoute>
                <SignIn />
              </OpenRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <OpenRoute>
                <SignUp />
              </OpenRoute>
            }
          />
          <Route path="/contact" element={<div>contact</div>} /> */}
          <Route
            path="/code-shift"
            element={
              // <PrivateRoute>
              <CodeShift />
              // </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>

      <Toaster richColors position="bottom-left" className="font-sans" />
    </div>
  );
};

export default App;
