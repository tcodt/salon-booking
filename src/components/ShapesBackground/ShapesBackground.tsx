import React, { useMemo } from "react";

export type ShapesBackgroundProps = {
  /** Tailwind class applied to the background container (usually 'bg-transparent') */
  backgroundClass?: string;
  /** How many shapes to render */
  shapeCount?: number;
  /** Tailwind background color classes for shapes (e.g. "bg-pink-400") */
  shapeColors?: string[];
  /** allow circle shapes */
  allowCircles?: boolean;
  /** allow triangle shapes (uses clip-path) */
  allowTriangles?: boolean;
  /** enable subtle floating animation */
  animate?: boolean;
  /** min size in px */
  minSize?: number;
  /** max size in px */
  maxSize?: number;
};

const ShapesBackground: React.FC<ShapesBackgroundProps> = ({
  backgroundClass = "bg-transparent",
  shapeCount = 20,
  shapeColors = ["bg-pink-300", "bg-blue-300", "bg-green-300", "bg-yellow-300"],
  allowCircles = true,
  allowTriangles = true,
  animate = false,
  minSize = 18,
  maxSize = 72,
}) => {
  const shapes = useMemo(() => {
    return Array.from({ length: shapeCount }).map((_, i) => {
      const size =
        Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const rotation = Math.floor(Math.random() * 360);
      const color = shapeColors[Math.floor(Math.random() * shapeColors.length)];

      // decide shape type
      const r = Math.random();
      let shapeType: "square" | "circle" | "triangle" = "square";
      if (allowCircles && r > 0.66) shapeType = "circle";
      else if (allowTriangles && r > 0.33 && r <= 0.66) shapeType = "triangle";

      const duration = (4 + Math.random() * 6).toFixed(2); // 4-10s
      const delay = (Math.random() * 3).toFixed(2);

      // Build the style. We use a CSS variable (--r) to store the initial rotation,
      // so the float keyframes can rotate relative to that value.
      const style: React.CSSProperties = {
        width: size,
        height: size,
        top: `${top}%`,
        left: `${left}%`,
        position: "absolute",
        // center the element by its center
        // (we rely on keyframes using translate(-50%,-50%) so make sure our animation does too)
        // If not animating, we set transform so it still centers and rotates correctly.
        transform: animate
          ? undefined
          : `translate(-50%,-50%) rotate(${rotation}deg)`,
        opacity: 0.36,
        pointerEvents: "none", // do not block mouse events
        // custom CSS variable for initial rotation;
        // TS doesn't include custom props by default, so cast below
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ["--r"]: `${rotation}deg`,
        // animation string if requested
        animation: animate
          ? `float ${duration}s ease-in-out ${delay}s infinite`
          : undefined,
      };

      const className = [
        color,
        shapeType === "circle" ? "rounded-full" : "",
        shapeType === "triangle" ? "shape-triangle" : "",
        // make sure shapes are behind content within the container
        "z-0",
      ].join(" ");

      return (
        <div key={i} className={className} style={style} aria-hidden="true" />
      );
    });
  }, [
    shapeCount,
    shapeColors,
    allowCircles,
    allowTriangles,
    animate,
    minSize,
    maxSize,
  ]);

  // container must be absolute/inset-0 so it fills the parent (modal) area
  return (
    <div
      className={`absolute inset-0 ${backgroundClass} z-0 pointer-events-none`}
    >
      {shapes}
    </div>
  );
};

export default ShapesBackground;
