import React from "react";
import { Link } from "react-router-dom";

export const AuthHeader = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-teal-700 via-indigo-600 to-slate-600 bg-clip-text">
        {heading}
      </h1>
      <p className="text-xs font-medium text-slate-600">{subHeading}</p>
      <div className="w-full h-px bg-slate-300 my-3" />
    </div>
  );
};

export const AuthFooter = ({ link, text }) => {
  return (
    <Link
      to={link}
      className="text-slate-500 font-medium hover:underline underline-offset-4 hover:text-indigo-600 text-sm"
    >
      {text}
    </Link>
  );
};
