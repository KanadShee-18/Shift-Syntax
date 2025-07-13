import { useState } from "react";
import { AuthFooter, AuthHeader } from "./AuthHeader";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import * as z from "zod";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BASE_URL } from "../../utils/url";

const FormError = ({ msg }) => {
  return <p className="text-sm font-medium text-red-400 ml-2">{msg}</p>;
};

const userSchema = z.object({
  username: z.string({ message: "User name is required!" }).min(3),
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z.string().min(6, {
    message: "Password should be minimum 6 characters",
  }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = userSchema.safeParse(formData);
      if (!validatedData.success) {
        const fieldErrors = validatedData.error.flatten().fieldErrors;
        setErrorMsg(fieldErrors);
        return;
      }
      setErrorMsg({});
      // console.log("Validated data: ", validatedData);
      const resp = await axios.post(
        `${BASE_URL}/api/v1/user/sign-up`,
        validatedData.data,
        { withCredentials: true }
      );
      // console.log("Axios response: ", resp);

      const success = resp.data.success;

      if (success) {
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        toast.success("Account created successfully!", {
          description: "Login with your credentials",
        });
        navigate("/sign-in", { replace: true });
        return;
      }

      // console.log("make the backend call");
    } catch (error) {
      // console.log("Error in form submission: ", error);
      if (error.response && error.response.data) {
        const errorMsg = error.response.data.message;
        toast.error(errorMsg, {
          description: "Please try again with correct details",
        });
      }
      throw new Error("Error in validating form data");
    }
  };
  return (
    <div className="grid w-full min-h-screen place-content-center relative">
      <div className="fixed inset-0 h-fullw-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="w-[340px] sm:w-[380px] md:w-[410px] p-5 rounded-2xl shadow-sm shadow-slate-400 relative z-10 bg-white ">
        <AuthHeader
          heading={"Welcome Buddy"}
          subHeading={
            "By creating your account you're maintaining our terms and privacy."
          }
        />
        <form onSubmit={handleSubmit} className="space-y-6 my-8">
          <div className="flex flex-col gap-y-1.5">
            <Label>Username</Label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder={"Enter Your Name"}
            />
            {errorMsg.username && <FormError msg={errorMsg.username[0]} />}
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label>Email</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder={"Enter Your email"}
            />
            {errorMsg.username && <FormError msg={errorMsg.email[0]} />}
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label>Password</Label>
            <div className="w-full h-fit relative">
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-xl text-primary"
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </span>
              <Input
                name="password"
                value={formData.password}
                type={showPassword ? "text" : "password"}
                onChange={handleOnChange}
                placeholder={"Enter a strong password"}
              />
            </div>
            {errorMsg.password && <FormError msg={errorMsg.password[0]} />}
          </div>

          <Button
            type="submit"
            className={
              "w-full group bg-gradient-to-r hover:bg-gradient-to-l from-teal-700 via-slate-700 to-indigo-600 tracking-wider"
            }
          >
            <p>SIGN UP</p>
            <ChevronRightIcon className="group-hover:translate-x-2 duration-300 transition-all" />
          </Button>
        </form>
        <div className="w-fit ml-auto mt-5">
          <AuthFooter link={"/sign-in"} text={"Already have an account?"} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
