import React from "react";

export const BoltBadge: React.FC = () => {
    return (
        <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed top-32 right-6 z-40 block transition-all duration-200 hover:scale-105"
            title="Built with Bolt">
            <img
                src="/bolt-badge.png"
                alt="Built with Bolt"
                className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            />
        </a>
    );
};
