import React, { useRef, useState } from "react";

export function WelcomeScreen({ onStart }) {
    const audioRef = useRef(null);
    const [isZooming, setIsZooming] = useState(false);

    const handleStartClick = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
        }

        setIsZooming(true);
        setTimeout(() => {
            onStart();
        }, 3000);
    };

    return (
        <div className={`flex flex-col p-4 items-center justify-center h-screen gap-5 ${isZooming ? "animate-zoomToButton" : ""}`}>
            <h1 className="font-bold text-2xl text-start font-display">It's TIIIIIMMMMMEEEEEE</h1>
            <p className="font-light text-sm text-center">
                Bienvenue dans l'application Secret Santa ! Organisez facilement votre échange de cadeaux.
            </p>
            <button
                onClick={handleStartClick}
                className="gap-3 px-1 flex items-center justify-end rounded-full w-10 h-10 border-red-600 bg-red-600 text-white border-2 transition-all duration-300 hover:w-40 overflow-hidden"
            >
                <span>Commencer</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
            <audio ref={audioRef} src="/secret-santa/assets/itstime.mp3" preload="auto" />
        </div>
    );
}
