import { Suspense } from "react";
import useInView from "../../utils/useInView";

/**
 * Defers mounting a 3D canvas (or any heavy child) until it's scrolled
 * near the viewport. Keeps a stable-sized container so layout doesn't shift.
 *
 * Props:
 *   children    — the heavy component to render once visible
 *   fallback    — rendered before visible; also the Suspense fallback
 *   className   — applied to the wrapper div
 *   style       — inline styles for the wrapper div (optional)
 *   rootMargin  — IntersectionObserver rootMargin
 */
const LazyCanvas = (props) => {
  const {
    children,
    fallback = null,
    className = "",
    style,
    rootMargin = "300px 0px",
  } = props;

  const [ref, inView] = useInView({ rootMargin, threshold: 0.01 });

  return (
    <div ref={ref} className={className} style={style}>
      {inView ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyCanvas;
