import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Avatar } from "./Avatar";

export const Appbar = () => {
  const { info, logout } = useAuth();
  const location = useLocation();
  const [userDropdown, setUserDropdown] = useState(false);
  const [menuDropdown, setMenuDropdown] = useState(false);
  const toggleUserDropdown = () => {
    if (menuDropdown) {
      setMenuDropdown(false);
    }
    setUserDropdown((c) => !c);
  };
  const toggleMenuDropdown = () => {
    if (userDropdown) {
      setUserDropdown(false);
    }
    setMenuDropdown((c) => !c);
  };
  return (
    <nav className="fixed w-full  md:border-b md:border-gray-200 ">
      <div className="relative bg-white border-b border-gray-200 md:border-0 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 p-2 md:p-4">
        <Link to="/blogs">
          <div className="leading-loose font-bold text-3xl md:text-4xl inline">
            Quill
            <div className="inline bg-gradient-to-r bg-clip-text text-transparent from-pink-500 to-orange-500">
              Weave
            </div>
          </div>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
            id="user-menu-button"
            aria-expanded={userDropdown}
            onClick={toggleUserDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <Avatar size="big" />
          </button>
          <button
            onClick={toggleMenuDropdown}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-user"
            aria-expanded={menuDropdown}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${menuDropdown ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link
                to="/blogs"
                className={`${location.pathname === "/blogs" ? "text-white bg-black md:text-black" : "text-gray-900 hover:bg-gray-100 md:text-slate-400 md:hover:bg-transparent md:hover:text-black"} block py-2 px-3 rounded md:bg-transparent md:p-0 `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/publish"
                className={`${location.pathname === "/publish" ? "text-white bg-black md:text-black" : "text-gray-900 hover:bg-gray-100 md:text-slate-400 md:hover:bg-transparent md:hover:text-black"} block py-2 px-3 rounded md:bg-transparent md:p-0 `}
              >
                Publish
              </Link>
            </li>
            <li>
              <Link
                to="/blogs/user/me"
                className={`${location.pathname === "/blogs/user/me" ? "text-white bg-black md:text-black" : "text-gray-900 hover:bg-gray-100 md:text-slate-400 md:hover:bg-transparent md:hover:text-black"} block py-2 px-3 rounded md:bg-transparent md:p-0 `}
              >
                My Blogs
              </Link>
            </li>
            <li>
              <a
                href="https://pay-app.citxruzz.online"
                className={`text-gray-900 hover:bg-gray-100 md:text-slate-400 md:hover:bg-transparent md:hover:text-black block py-2 px-3 rounded md:bg-transparent md:p-0 `}
              >
                Other
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/citxruzz"
                className={`text-gray-900 hover:bg-gray-100 md:text-slate-400 md:hover:bg-transparent md:hover:text-black block py-2 px-3 rounded md:bg-transparent md:p-0 `}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      {userDropdown && (
        <div className="flex justify-end max-w-screen-xl pt-0 p-4 mx-auto">
          <div
            className="fixed z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 ">{info?.name}</span>
              <span className="block text-sm  text-gray-500 truncate ">
                {info?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/blogs"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs/user/me"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Blogs
                </Link>
              </li>
              <li>
                <a
                  href="https://x.com/ayushwasnothere"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/citxruzz"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Instagram
                </a>
              </li>
              <li>
                <div
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
