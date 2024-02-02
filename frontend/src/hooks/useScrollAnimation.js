import { useEffect } from "react";

const useScrollAnimation = (refs, options = {}) => {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        entry.target.style.transition = "opacity 0.3s ease-in-out";
        entry.target.style.opacity = entry.isIntersecting ? 1 : 0;
      });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // 유효한 DOM 요소에 대해서만 관찰을 시작합니다.
    refs.current.forEach((ref) => {
      if (ref && ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref && ref.current) observer.unobserve(ref.current);
      });
    };
  }, [refs, options]);
};

export default useScrollAnimation;
