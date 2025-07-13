import HomeSection from "./components/HeroSection";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Toaster } from "sonner";
import PrivateRoute from "./components/PrivateRoute";
import OpenRoute from "./components/OpenRoute";
import CodeShift from "./components/codeConvert/CodeShift";
import About from "./components/About";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="selection:bg-primary/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/about" element={<About />} />
        <Route
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
        <Route path="/contact" element={<div>contact</div>} />
        <Route
          path="/code-shift"
          element={
            <PrivateRoute>
              <CodeShift />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster richColors position="bottom-left" className="font-sans" />
    </div>
  );
};

export default App;
