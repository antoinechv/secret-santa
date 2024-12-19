import React, { useEffect, useState } from "react";


const Snowfall = () => {
    const [flakes, setFlakes] = useState([]);

    useEffect(() => {
        const generateSnowflakes = () => {
            const numFlakes = 100;
            const flakesArray = [];
            for (let i = 0; i < numFlakes; i++) {
                const size = Math.random() * 5 + 2; // Random size between 2px and 7px
                const speed = Math.random() * 8 + 5; // Random speed between 5s and 13s
                const left = Math.random() * 100; // Position horizontally across the screen
                flakesArray.push({ size, speed, left });
            }
            setFlakes(flakesArray);
        };

        generateSnowflakes();
        const interval = setInterval(generateSnowflakes, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none">
            {flakes.map((flake, index) => (
                <div
                    key={index}
                    className="snowflake absolute rounded-full bg-white opacity-75"
                    style={{
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        left: `${flake.left}%`,
                        animation: `fall ${flake.speed}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default Snowfall;
