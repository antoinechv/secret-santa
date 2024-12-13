import React, { useRef, useState } from "react";

export function WelcomeScreen({ onStart }) {
    const audioRef = useRef(null);
    const [isAudioAllowed, setIsAudioAllowed] = useState(false);
    const [isZooming, setIsZooming] = useState(false); // Gérer l'animation de zoom

    const allowAudio = () => {
        setIsAudioAllowed(true);
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                console.log("Audio autorisé, mais lecture différée");
            });
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleStartClick = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
        }

        setIsZooming(true); // Active l'effet de zoom

        // Transition vers la prochaine vue après 3 secondes
        setTimeout(() => {
            onStart();
        }, 3000);
    };

    return (
        <div
            className={`flex flex-col p-4 items-center justify-center h-screen gap-5 ${
                isZooming ? "animate-zoomToButton" : ""
            }`}
        >
            <h1 className="font-bold text-2xl text-start font-display">
                It's TIIIIIMMMMMEEEEEE
            </h1>

            <p className="font-light text-sm text-center">
                Bienvenue dans l'application Secret Santa ! Organisez facilement votre
                échange de cadeaux entre amis ou collègues.
            </p>


            <button
                onClick={handleStartClick}
                className="gap-3 px-1 flex items-center justify-end rounded-full w-10 h-10 border-red-600 bg-red-600 text-white border-2 transition-all duration-300 hover:w-40 overflow-hidden"
            >
                <span className="">Commencer</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 shrink-0"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>

            <audio ref={audioRef} src="/secret-santa/assets/itstime.mp3" preload="auto" />
        </div>
    );
}
