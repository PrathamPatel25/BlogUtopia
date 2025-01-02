import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const objectives = [
  {
    key: "User Authentication",
    value:
      "Allows users to securely sign up, log in, and access their accounts.",
    icon: "🔒",
  },
  {
    key: "Create Blog Post",
    value:
      "Enables users to effortlessly write and publish their own blog posts.",
    icon: "✍️",
  },
  {
    key: "Update Blog Post",
    value:
      "Provides users with the ability to edit and update their published blog posts.",
    icon: "📝",
  },
  {
    key: "Set Blog Post Status",
    value: "Allows users to set their blog posts as 'active' or 'inactive'.",
    icon: "🔄",
  },
  {
    key: "Read Blog Posts",
    value:
      "Offers a user-friendly interface to browse and read various blog posts.",
    icon: "📖",
  },
  {
    key: "User Posts",
    value: "Displays all blogs posted by a user in one place.",
    icon: "👤",
  },
  {
    key: "Responsive Design",
    value: "Delivers a smooth and consistent experience across all devices.",
    icon: "📱",
  },
];

function HorizontalScroll() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    // Horizontal Scroll with GSAP and ScrollTrigger
    const scrollTimeline = gsap.to(content, {
      x: () => -(content.scrollWidth - container.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${content.scrollWidth - container.offsetWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * objectives.length),
            objectives.length - 1
          );
          setActiveIndex(newIndex);
        },
      },
    });

    // Cleanup GSAP animations and ScrollTrigger on unmount
    return () => {
      scrollTimeline.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  useEffect(() => {
    // Mouse move effect for floating objects
    const handleMouseMove = (event) => {
      const elements = document.querySelectorAll(".moving-object");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const offsetX = (event.clientX - (rect.left + rect.width / 2)) / 50;
        const offsetY = (event.clientY - (rect.top + rect.height / 2)) / 50;

        gsap.to(element, {
          x: offsetX,
          y: offsetY,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div
        ref={containerRef}
        className="max-w-screen-xl mx-auto px-4 py-12 relative"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900 dark:text-white">
          Key Features
        </h2>

        <div ref={contentRef} className="flex gap-6 py-8">
          {objectives.map((objective, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`flex-shrink-0 w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] 
                bg-white rounded-xl shadow-lg moving-object ${
                  activeIndex === index ? "ring-2 ring-blue-500" : ""
                }`}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 rounded-lg mb-4">
                  <div className="text-4xl mb-2">{objective.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {objective.key}
                  </h3>
                </div>
                <p className="text-gray-600 flex-grow">{objective.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HorizontalScroll;
