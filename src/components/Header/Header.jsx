import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-sky-400 text-white h-16 z-50 relative">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="block md:hidden">
            <button onClick={() => setMenuOpen(true)} aria-label="Menu">
              <AiOutlineMenu className="text-2xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`fixed top-0 right-0 h-full bg-sky-400 shadow-lg transform ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out w-64 z-50 md:w-auto md:static md:flex md:translate-x-0 md:bg-transparent`}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4 md:hidden">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
                className="text-white text-2xl"
              >
                <AiOutlineClose />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:ml-auto h-full p-4 md:p-0">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="mb-4 md:mb-0">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate(item.slug);
                        }}
                        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full md:text-white"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
