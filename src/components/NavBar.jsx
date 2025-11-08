import { Link, NavLink } from "react-router";
import { IoLogoModelS } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaDownload, FaGear, FaUser } from "react-icons/fa6";
import { LuRotate3D } from "react-icons/lu";
import { ImBoxAdd } from "react-icons/im";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = use(AuthContext);

  // ✅ Load theme from localStorage, default to light
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Update HTML and localStorage whenever theme changes
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Toggle theme
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="navbar py-0 min-h-0 z-1 shadow-sm rounded-full glass-card max-w-7xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to={"/"}>
                <GoHomeFill />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/all-models"}>
                <IoLogoModelS /> All Models
              </NavLink>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="flex items-center gap-1 text-xl font-bold">
          <LuRotate3D /> 3D Models Hub
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          <li>
            <NavLink to={"/"}>
              <GoHomeFill />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/all-models"}>
              <IoLogoModelS /> All Models
            </NavLink>
          </li>
          <li>
            <NavLink to={"/add-model"}>
              <ImBoxAdd /> Add Model
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>

              <li className="mt-3">
                <Link to={"/profile"}>
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <Link to={"/my-models"}>
                  <IoLogoModelS /> My Models
                </Link>
              </li>
              <li>
                <Link to={"/my-downloads"}>
                  <FaDownload /> My Downloads
                </Link>
              </li>

              {/* ✅ Theme Toggle */}
              <div className="flex items-center px-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleTheme(e.target.checked)}
                  checked={theme === "dark"}
                  className="toggle mx-2"
                />
                <span className="text-sm">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </div>

              <li className="mb-2">
                <a>
                  <FaGear /> Settings
                </a>
              </li>

              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-xs text-left bg-gradient-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn rounded-full border-gray-300 btn-sm bg-gradient-to-r from-pink-500 to-red-500 text-white"
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
