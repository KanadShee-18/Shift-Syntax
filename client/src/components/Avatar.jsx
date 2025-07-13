import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";

const Avatar = ({ user, handleLogout }) => {
  const { email, username } = user;
  if (!email || !username) {
    return (
      <div>
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={
              "rounded-full text-xl aspect-square w-10 h-10 bg-teal-50 shadow-sm shadow-slate-500 text-indigo-900 hover:bg-teal-300"
            }
          >
            {username[0]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-16 mt-5" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span className="flex flex-col gap-0.5">
                <p className="text-base font-semibold text-teal-600">
                  {username}
                </p>
                <p className="text-slate-500">{email}</p>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <div
              onClick={handleLogout}
              className="flex flex-row items-center gap-x-2  w-full py-2 px-1 rounded-lg group"
            >
              <p className="font-semibold text-slate-700 group-hover:text-destructive">
                Log Out
              </p>
              <LogOutIcon className="group-hover:translate-x-2 transition-all duration-300 group-hover:text-destructive" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default Avatar;
