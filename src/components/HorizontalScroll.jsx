import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const objectives = [
  {
    key: "User Authentication",
    value:
      "Allows users to securely sign up, log in, and access their accounts.",
  },
  {
    key: "Create Blog Post",
    value:
      "Enables users to effortlessly write and publish their own blog posts.",
  },
  {
    key: "Update Blog Post",
    value:
      "Provides users with the ability to edit and update their published blog posts.",
  },
  {
    key: "Set Blog Post Status",
    value:
      "Allows users to set their blog posts as 'active' or 'inactive' for better content management.",
  },
  {
    key: "Read Blog Posts",
    value:
      "Offers a user-friendly interface to browse and read various blog posts.",
  },
  {
    key: "User Posts",
    value: "Displays all blogs posted by a user in one place.",
  },
  {
    key: "Responsive Design",
    value:
      "Delivers a smooth and consistent experience across all device types and screen sizes.",
  },
];

function HorizontalScroll() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    gsap.to(content, {
      x: () => -(content.scrollWidth - container.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: () => `+=${content.scrollWidth - container.offsetWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative mt-16 sm:mt-32 md:mt-48 lg:mt-80"
    >
      <div ref={contentRef} className="flex">
        {objectives.map((objective, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] px-2 sm:px-4 md:px-6 bg-slate-100 rounded-lg mr-2"
          >
            <div className="text-center p-2 sm:p-4">
              <div className="bg-blue-900 text-white p-2 sm:p-3 md:p-4 rounded-lg mb-3 sm:mb-4">
                <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold break-words">
                  {objective.key}
                </h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 break-words whitespace-normal">
                {objective.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalScroll;
