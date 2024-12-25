import React, { useEffect } from "react";
import gsap from "gsap";

const Title = () => {
  useEffect(() => {
    const breakText = () => {
      const h1 = document.querySelector(".title");
      const text = h1.textContent;
      const splittedText = text.split("");
      const html = splittedText
        .map((char, i) => {
          const halfLen = Math.floor(splittedText.length / 2);
          const className = i < halfLen ? "leftPart" : "rightPart";
          return `<span class="${className}" style="display: inline-block;">${char}</span>`;
        })
        .join("");
      h1.innerHTML = html;
    };

    breakText();

    gsap.from(".leftPart", {
      y: 50,
      duration: 0.6,
      opacity: 0,
      delay: 0.5,
      stagger: 0.15,
    });

    gsap.from(".rightPart", {
      y: 50,
      duration: 0.6,
      opacity: 0,
      delay: 0.5,
      stagger: -0.15,
    });
  }, []);

  return (
    <div className="w-screen flex justify-center pt-10 items-center bg-transparent">
      <h1 className="title text-slate-800 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold overflow-hidden h-[60px] sm:h-[75px] md:h-[75px] lg:h-[90px]">
        BlogUtopia
      </h1>
    </div>
  );
};

export default Title;
