import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean indicating whether the ref element has entered the viewport.
 * Once it has entered, the boolean stays true (one-way trigger) — ideal for
 * triggering heavy lazy-loaded resources that shouldn't re-mount on scroll.
 */
export default function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: "200px 0px", threshold: 0.01 }
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true); // graceful fallback
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
