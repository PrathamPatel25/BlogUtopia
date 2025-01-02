import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = ({ stats }) => {
  const statsRef = useRef(null);

  const defaultStats = [
    { number: 1000, label: "Active Writers" },
    { number: 5000, label: "Published Articles" },
    { number: 25000, label: "Monthly Readers" },
  ];

  const displayStats = stats || defaultStats;

  useEffect(() => {
    if (!statsRef.current) return;

    const statsElements = statsRef.current.querySelectorAll(".stat-number");

    if (statsElements.length === 0) return;

    statsElements.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));

      const trigger = ScrollTrigger.create({
        trigger: stat,
        start: "top center+=100",
        onEnter: () => {
          gsap.to(stat, {
            duration: 2,
            innerText: target,
            snap: { innerText: 1, duration: 0.1 },
            ease: "power2.out",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={statsRef}
      className="py-20 bg-blue-700 text-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {displayStats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div
                className="stat-number text-5xl font-bold mb-2"
                data-target={stat.number}
              >
                0
              </div>
              <div className="text-xl text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
