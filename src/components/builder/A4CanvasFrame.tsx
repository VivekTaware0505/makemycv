import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { getResumeCanvasScale, RESUME_A4 } from "@/lib/resumeA4";

interface Props {
  children: ReactNode;
}

const A4CanvasFrame = ({ children }: Props) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateScale = () => {
      setScale(getResumeCanvasScale(frame.getBoundingClientRect().width));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="mx-auto w-full max-w-[794px]"
      style={{ aspectRatio: `${RESUME_A4.width} / ${RESUME_A4.height}` }}
    >
      <div
        style={{
          width: RESUME_A4.width,
          height: RESUME_A4.height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default A4CanvasFrame;