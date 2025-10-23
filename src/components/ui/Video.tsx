import React from "react";

interface VideoProps {
  src: string;
  poster?: string;
  className?: string;
  aspectRatio?: number; // tỉ lệ = width / height, ví dụ 16/9 = 1.777
}

const Video: React.FC<VideoProps> = ({
  src,
  poster,
  className = "",
  aspectRatio = 16 / 9,
}) => {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${aspectRatio}` }} // giữ tỉ lệ
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
