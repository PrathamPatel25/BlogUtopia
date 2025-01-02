import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = ({
  title = "Ready to Start Your Writing Journey?",
  subtitle = "Join our community of writers and share your unique perspective with the world.",
  buttonText = "Create Your Account",
}) => {
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ctaRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ctaRef.current,
      start: "top center+=100",
      onEnter: () => {
        gsap.from(ctaRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      },
    });

    return () => {
      if (trigger) {
        trigger.kill();
      }
    };
  }, []);

  return (
    <section
      ref={ctaRef}
      className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-8">{subtitle}</p>
        <button
          onClick={() => navigate("signup")}
          className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
