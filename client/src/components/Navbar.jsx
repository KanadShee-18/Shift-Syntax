import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
import { toast } from "sonner";
import { setToken, setUser } from "../../slice/authSlice";
import {
  Blinds,
  GitCompare,
  LogInIcon,
  User,
  LogOutIcon,
  BracesIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import Avatar from "./Avatar";

const navitems = [
  {
    id: 1,
    pathName: "Home",
    url: "/",
    icon: Blinds,
  },
  {
    id: 2,
    pathName: "About",
    url: "/about",
    icon: GitCompare,
  },
  {
    id: 3,
    pathName: "Login",
    url: "/sign-in",
    icon: LogInIcon,
  },
  {
    id: 4,
    pathName: "Sign Up",
    url: "/sign-up",
    icon: User,
  },
];

const Navbar = () => {
  const location = useLocation();
  // console.log(location.pathname);
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const resp = await axios.post(
        `${BASE_URL}/api/v1/user/logout`,
        {
          token: token,
        },
        {
          withCredentials: true,
        }
      );
      if (resp.data.success) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        dispatch(setToken(null));
        dispatch(setUser(null));
      }
      toast.success("Logout successful!");
      navigate("/", { replace: true });
    } catch {
      // console.log("Logout error: ", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <div
      className={`fixed z-[999] top-1 h-16 w-full lg:max-w-[1200px] ${
        pathname === "/about" ? "hidden" : "block"
      }  left-1/2 -translate-x-1/2 mx-auto`}
    >
      <div
        className={`flex justify-between backdrop-blur-md ${
          pathname === "/code-shift"
            ? "bg-white/5"
            : "bg-primary-foreground/20 shadow-slate-300"
        } items-center h-full px-4 md:px-10 rounded-full shadow-md md:mx-10 mx-4`}
      >
        <div>
          <Link to={"/"} className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-12" />
            <img
              src="/logo-text.png"
              alt="Logo"
              className="w-52 md:block hidden"
            />
          </Link>
        </div>
        <div>
          <ul className="flex flex-row gap-2 md:gap-4">
            {!token ? (
              navitems.map((navlink, index) => (
                <Link
                  to={navlink.url}
                  key={navlink.id}
                  className={`relative flex items-center group hover:text-teal-600`}
                >
                  <navlink.icon className="size-4 group-hover:translate-x-1 duration-300 transition-all" />
                  <li className="text-sm px-2.5 py-1.5 rounded-md   group-hover:-translate-x-1 duration-300 transition-all cursor-pointer">
                    {navlink.pathName}
                  </li>
                  {index < navitems.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className={"!h-4 bg-teal-400"}
                    />
                  )}
                </Link>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={pathname === "/code-shift" ? "/" : "/code-shift"}
                  className={`group flex items-center ${
                    pathname === "/code-shift"
                      ? "bg-background/5"
                      : "bg-background shadow-slate-300"
                  } gap-2.5 h-full px-5 text-sm rounded-md hover:bg-gradient-to-br from-teal-200 via-indigo-300 to-slate-200 hover:scale-[0.97] duration-300 transition-all hover:text-slate-800 text-teal-500 font-semibold shadow-sm`}
                >
                  {pathname === "/code-shift" ? (
                    <Blinds className="group-hover:translate-x-1 duration-200 transition-all size-5" />
                  ) : (
                    <BracesIcon className="group-hover:translate-x-1 duration-200 transition-all size-5" />
                  )}

                  <p className="group-hover:-translate-x-0.5 duration-200 transition-all">
                    {pathname === "/code-shift"
                      ? "Back to Home"
                      : "Convert Code"}
                  </p>
                </Link>
                <Avatar user={user} handleLogout={handleLogout} />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
