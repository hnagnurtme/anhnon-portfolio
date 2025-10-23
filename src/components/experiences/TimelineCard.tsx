import React from "react";

export interface TimelineEvent {
    id: string;
    title: string;
    name: string;
    duration: string;
    image?: string;
}

interface TimelineCardProps {
    event: TimelineEvent;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event }) => {
    return (
        <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-800/30 shadow-lg p-6 w-full card-hover">
            {/* Ảnh với tỉ lệ cố định 16:9, full image */}
            {event.image ? (
                <div className="w-full aspect-[4/3] mb-4 rounded-lg glow-border overflow-hidden flex items-center justify-center bg-gray-700">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-contain"
                    />
                </div>
            ) : (
                <div className="w-full aspect-[4/3] bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-bold text-purple-400 text-center mb-2">
                {event.title}
            </h3>

            {/* Name */}
            <p className="text-white text-center text-base">
                {event.name}
            </p>
        </div>
    );
};

export default TimelineCard;
