import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import ThemeBtn from "../ThemeBtn";

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
    {
      name: "Your Place",
      slug: "/profile",
      active: authStatus,
    },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <header className="py-3 shadow h-16 dark:text-white dark:bg-gray-900">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-20"
              aria-label="Menu"
            >
              {menuOpen ? (
                <AiOutlineClose className="text-2xl" />
              ) : (
                <AiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>

          {menuOpen && (
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setMenuOpen(false)}
              style={{ zIndex: 10 }}
            />
          )}

          <ul
            className={`fixed top-0 right-0 h-screen md:h-auto bg-slate-100 shadow-lg transform ${
              menuOpen
                ? "translate-x-0 dark:bg-slate-900"
                : "translate-x-full dark:bg-transparent"
            } transition-transform duration-300 ease-in-out w-64 md:w-auto md:static md:flex md:translate-x-0 md:bg-transparent md:shadow-none`}
            style={{ zIndex: 15 }}
          >
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
                        className="inline-block px-6 py-2 duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-black dark:text-white"
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
              <li>
                <ThemeBtn />
              </li>
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
