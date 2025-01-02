import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    value:
      "Allows users to set their blog posts as 'active' or 'inactive' for better content management.",
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
    value:
      "Delivers a smooth and consistent experience across all device types and screen sizes.",
    icon: "📱",
  },
];

function HorizontalScroll() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const cards = cardsRef.current;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=300%",
        scrub: 1,
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

    tl.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth + 32),
      ease: "none",
    });

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (!isScrolling) {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isScrolling]);

  const scrollTo = (index) => {
    setIsScrolling(true);
    const section = sectionRef.current;
    const progress = index / (objectives.length - 1);

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: section.offsetTop + section.offsetHeight * progress,
        autoKill: false,
      },
      ease: "power2.inOut",
      onComplete: () => {
        setIsScrolling(false);
        setActiveIndex(index);
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900 opacity-0">
          Key Features
        </h2>

        <div className="relative">
          <div ref={containerRef} className="flex gap-6 py-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`flex-shrink-0 w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] 
                  bg-white rounded-xl shadow-lg ${
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

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10">
            {objectives.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-blue-900 w-4" : "bg-gray-300"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HorizontalScroll;
