import { lazy } from "react";

// Each canvas is code-split into its own chunk and only mounts when its
// LazyCanvas wrapper sees it in (or near) the viewport.
const EarthCanvas = lazy(() => import("./Earth"));
const BallCanvas = lazy(() => import("./Ball"));
const ComputersCanvas = lazy(() => import("./Computers"));
const StarsCanvas = lazy(() => import("./Stars"));

export { EarthCanvas, BallCanvas, ComputersCanvas, StarsCanvas };
export { default as LazyCanvas } from "./LazyCanvas";
