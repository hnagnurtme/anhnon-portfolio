import React from "react";

interface VideoProps {
  src: string;
  poster?: string;
  className?: string;
  height?: string | number; // Chiều cao cố định, ví dụ '500px' hoặc 50% viewport
}

const Video: React.FC<VideoProps> = ({
  src,
  poster,
  className = "",
  height,
}) => {
  const containerStyle: React.CSSProperties = height
    ? { height: typeof height === "number" ? `${height}px` : height }
    : { display: "inline-block" }; 

  return (
    <div
      className={`relative ${className}`}
      style={containerStyle}
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-auto h-full block rounded-2xl"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
