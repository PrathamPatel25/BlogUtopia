import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import Logo from "../Logo";

export default function Footer() {
  return (
    <section className="relative py-8 sm:py-10 bg-sky-200 w-full dark:bg-slate-900 dark:text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row flex-wrap -mx-4">
          {/* Logo and Copyright Section */}
          <div className="w-full px-4 sm:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between mb-10 sm:mb-0">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-white">
                  &copy; Copyright 2024. All Rights Reserved by BlogUtopia.
                </p>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
            <div className="h-full mb-10 sm:mb-0">
              <h3 className="tracking-px mb-6 sm:mb-9 text-xs font-semibold uppercase text-gray-500 dark:text-white">
                Blog
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-white"
                    to="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-white"
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-white"
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-white"
                    to="/terms-and-conditions"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* GitHub Icon Section */}
          <div className="w-full px-4 sm:w-1/2 lg:w-4/12">
            <div className="h-full flex justify-center items-center pt-4 sm:pt-0">
              <a
                href="https://github.com/PrathamPatel25/BlogUtopia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 dark:text-white transition-colors duration-200"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
