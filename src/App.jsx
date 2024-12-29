import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./context/theme";
import Loader from "./pages/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [themeMode, setThemeMode] = useState("light");
  const location = useLocation();

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const excludedPaths = ["/login", "/signup"];
  const shouldExcludeLayout = excludedPaths.includes(location.pathname);

  return !loading ? (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="min-h-screen flex flex-col content-between bg-white">
        <div className="w-full block">
          {!shouldExcludeLayout && <Header />}
          <main>
            <Outlet />
          </main>
          {!shouldExcludeLayout && <Footer />}
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <Loader />
  );
}

export default App;
