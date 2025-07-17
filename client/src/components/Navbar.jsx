import { Blinds, GitCompare, RefreshCcw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";

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
    pathName: "Converter",
    url: "/code-shift",
    icon: RefreshCcw,
  },
  // {
  //   id: 3,
  //   pathName: "Login",
  //   url: "/sign-in",
  //   icon: LogInIcon,
  // },
  // {
  //   id: 4,
  //   pathName: "Sign Up",
  //   url: "/sign-up",
  //   icon: User,
  // },
];

const Navbar = () => {
  const location = useLocation();
  // console.log(location.pathname);
  const pathname = location.pathname;
  // const dispatch = useDispatch();
  // const { token, user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     const resp = await axios.post(
  //       `${BASE_URL}/api/v1/user/logout`,
  //       {
  //         token: token,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (resp.data.success) {
  //       localStorage.removeItem("authToken");
  //       localStorage.removeItem("user");

  //       dispatch(setToken(null));
  //       dispatch(setUser(null));
  //     }
  //     toast.success("Logout successful!");
  //     navigate("/", { replace: true });
  //   } catch {
  //     // console.log("Logout error: ", error);
  //     toast.error("Logout failed. Please try again.");
  //   }
  // };
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
              className="w-48 md:block hidden"
            />
          </Link>
        </div>
        <div>
          <ul className="flex flex-row gap-2 md:gap-4">
            {navitems.map((navlink, index) => (
              <Link
                to={navlink.url}
                key={navlink.id}
                className={`relative flex items-center group hover:text-teal-600`}
              >
                <navlink.icon
                  className={`
                  ${
                    navlink.pathName === "Converter" &&
                    "group-hover:animate-spin"
                  }
                  size-4 mx-2 md:mx-0 group-hover:translate-x-1 duration-300 transition-all`}
                />
                <li className="text-sm md:block hidden px-2.5 py-1.5 rounded-md   group-hover:-translate-x-1 duration-300 transition-all cursor-pointer">
                  {navlink.pathName}
                </li>
                {index < navitems.length - 1 && (
                  <Separator
                    orientation="vertical"
                    className={"!h-4 bg-teal-400"}
                  />
                )}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
