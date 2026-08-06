import engineeringImg from "@/assets/stream-engineering.jpg";
import computerImg from "@/assets/stream-computer.jpg";
import managementImg from "@/assets/stream-management.jpg";
import medicalImg from "@/assets/stream-medical.jpg";
import agricultureImg from "@/assets/stream-agriculture.jpg";
import { StreamId } from "./types";

export const streamImage: Record<StreamId, string> = {
  engineering: engineeringImg,
  "computer-application": computerImg,
  management: managementImg,
  medical: medicalImg,
  agriculture: agricultureImg,
};

/** Very faint field-matched backdrop for a stream card. */
export const StreamBackdrop = ({ stream }: { stream: StreamId }) => (
  <img
    src={streamImage[stream]}
    alt=""
    aria-hidden="true"
    loading="lazy"
    width={1024}
    height={640}
    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] blur-[2px] saturate-150"
  />
);
