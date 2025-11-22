import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface FontWeightConfig {
  min: number;
  max: number;
  default: number;
}

const FONT_WEIGHTS: Record<string, FontWeightConfig> = {
  subTitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text: string, className: string, baseWeight?: number) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight ?? 400}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container: HTMLElement, type: string) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (
    letter: HTMLElement,
    weight: number,
    duration = 0.25
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 10000);

      animateLetter(letter, min + (max - min) * intensity, 0.25);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove as EventListener);
  container.addEventListener("mouseleave", handleMouseLeave as EventListener);

  return () => {
    container.removeEventListener(
      "mousemove",
      handleMouseMove as EventListener
    );
    container.removeEventListener(
      "mouseleave",
      handleMouseLeave as EventListener
    );
  };
};

export default function Welcome() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const titleCleanup = titleRef.current
      ? setupTextHover(titleRef.current, "title")
      : () => {};
    const subTitleCleanup = subTitleRef.current
      ? setupTextHover(subTitleRef.current, "subTitle")
      : () => {};

    return () => {
      if (titleCleanup) titleCleanup();
      if (subTitleCleanup) subTitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subTitleRef}>
        {renderText(
          "Hey, I'm Oahid!! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("Macfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This Macfolio is designed for desktop/tablet screens only</p>
      </div>
    </section>
  );
}
