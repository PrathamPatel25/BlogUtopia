import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Pen, Users, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({
  title = "Share Your Story With The World",
  subtitle = "Create, share, and discover amazing blog content",
  ctaText = "Start Writing Today",
}) => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [".hero-title", ".hero-subtitle", ".hero-cta", ".floating-card"],
        {
          opacity: 0,
          y: 50,
        }
      );

      const heroTl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" },
      });

      heroTl
        .to(".hero-title", {
          opacity: 1,
          y: 0,
          duration: 1,
        })
        .to(
          ".hero-subtitle",
          {
            opacity: 1,
            y: 0,
          },
          "-=0.5"
        )
        .to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            scale: 1,
          },
          "-=0.3"
        )
        .to(
          ".floating-card",
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
          },
          "-=0.5"
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const features = [
    {
      icon: <Pen />,
      text: "Easy Writing",
      description: "Create and edit posts with our intuitive editor",
    },
    {
      icon: <Users />,
      text: "Growing Community",
      description: "Connect with readers and fellow writers",
    },
    {
      icon: <Book />,
      text: "Rich Content",
      description: "Support for markdown, images, and more",
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="text-center pt-20">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-blue-900 mb-6 dark:text-white">
            {title}
          </h1>
          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <button
            onClick={() => navigate("signup")}
            className="hero-cta bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {ctaText}
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {features.map((item, index) => (
              <div
                key={index}
                className="floating-card bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.text}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
