import React, { useState } from "react";
import Logo from "./Logo";
import { Link, useLocation, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const locations = ["/", "/movie", "/tv"];
  const [active, setActive] = useState(locations.indexOf(location.pathname));
  const [query, setQuery] = useState(new URLSearchParams(useLocation().search).get("q"));
  const [menuState, setMenuState] = useState<"block" | "hidden">("hidden");

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?q=${query}`);
  };

  return (
    <nav className="nav-fixed-bg fixed top-0 z-40 w-full">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              onClick={() => {
                setMenuState(menuState === "block" ? "hidden" : "block");
              }}
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center  sm:justify-between">
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => {setActive(0); setMenuState("hidden")}}>
                <Logo />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center">
                <Link
                  to="/movie"
                  onClick={() => setActive(1)}
                  className={`${
                    active === 1 ? "text-opacity-100" : "text-opacity-75"
                  } text-white px-3 py-2 text-md leading-5 hover:text-opacity-100  focus:outline-none focus:text-white transition duration-150 ease-in`}
                >
                  Movies
                </Link>
                <Link
                  to="/tv"
                  onClick={() => setActive(2)}
                  className={`${
                    active === 2 ? "text-opacity-100" : "text-opacity-75"
                  } text-white px-3 py-2 text-md leading-5 hover:text-opacity-100  focus:outline-none focus:text-white transition duration-150 ease-in`}
                >
                  TV Shows
                </Link>
                <form className="relative text-gray-600" onSubmit={search}>
                  <input
                    className="bg-white h-8 px-3 pr-8 rounded-lg text-sm focus:outline-none"
                    type="text"
                    name="search"
                    value={query ?? ""}
                    placeholder="Search"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(event.target.value)
                    }
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-2 mr-4 focus:outline-none border-none"
                  >
                    <svg
                      className="text-gray-600 h-4 w-4 fill-current"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      xmlSpace="preserve"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              aria-label="Notifications"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <div className="ml-3 relative">
              <div>
                <button
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                <div
                  className="py-1 rounded-md bg-white shadow-xs"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className={`${menuState} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 flex flex-col items-center">
          <Link
            to="/movie"
            onClick={() => {
              setActive(1);
              setMenuState("hidden");
            }}
            className={`${
              active === 1
                ? "bg-gray-900 text-white"
                : "bg-transparent text-gray-300"
            } block px-3 py-2 rounded-md text-base font-medium  hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
          >
            Movies
          </Link>
          <Link
            to="/tv"
            onClick={() => {
              setActive(2);
              setMenuState("hidden");
            }}
            className={`${
              active === 2
                ? "bg-gray-900 text-white"
                : "bg-transparent text-gray-300"
            } mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out`}
          >
            TV Shows
          </Link>
          <form className="relative mt-3 max-w-md text-gray-600" onSubmit={search}>
            <input
              className="bg-white w-full h-8 px-3 pr-8 rounded-lg text-sm focus:outline-none"
              type="text"
              name="search"
              placeholder="Search"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(event.target.value)
              }
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-4 focus:outline-none border-none"
            >
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
