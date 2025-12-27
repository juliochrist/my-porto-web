import { useEffect, useState, useRef } from "react";

export const useScrollReveal = (option = {}) => {
  const { threshold = 0.1, rootMargin = "0px" } = option;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const elemet = ref.current;
    if (!elemet) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(elemet);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(elemet);

    return () => {
      if (elemet) {
        observer.unobserve(elemet);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
