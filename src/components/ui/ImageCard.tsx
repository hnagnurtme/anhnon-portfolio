import React from "react";

interface ImageCardProps {
    image?: string;
    alt?: string;
    className?: string;
    ratio?: string; // ví dụ "16/9" hoặc "4/3"
}

const ImageCard: React.FC<ImageCardProps> = ({
    image,
    alt = "Project preview",
    className = "",
    ratio = "16/9",
}) => {
    return (
        <div
            className={`
                relative rounded-2xl overflow-hidden group 
                bg-white flex items-center justify-center
                aspect-[${ratio}]  // 🔹 giữ tỉ lệ cố định
                shadow-[0_0_20px_rgba(139,92,246,0.25)]
                hover:shadow-[0_0_35px_rgba(139,92,246,0.4)]
                transition-all duration-500 ease-out
                ${className}
            `}
        >
            {image ? (
                <img
                    src={image.startsWith("http")
                        ? image
                        : `${window.location.origin}/${image.replace(/^\//, "")}`}
                    alt={alt}
                    className="max-w-full max-h-full object-contain" // 🔹 luôn hiển thị hết ảnh, không cắt
                    loading="lazy"
                    crossOrigin="anonymous"
                    onError={(e) => {
                        console.error("Image load failed:", image);
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.parentElement!.innerHTML = `
                            <div class='w-full h-full bg-gradient-to-br from-purple-800/40 to-gray-900 
                            flex flex-col items-center justify-center text-purple-300 text-sm p-2 text-center'>
                                <span>Failed to load:</span>
                                <span class='text-xs break-all'>${image}</span>
                            </div>`;
                    }}
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-800/40 to-gray-900 flex items-center justify-center text-purple-300 text-sm">
                    No Image
                </div>
            )}
        </div>
    );
};

export default ImageCard;
