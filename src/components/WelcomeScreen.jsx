import React, { useRef, useState } from "react";

export function WelcomeScreen({ onStart }) {
    const audioRef = useRef(null);
    const [isAudioAllowed, setIsAudioAllowed] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

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

    const playMusic = () => {
        if (isAudioAllowed && audioRef.current) {
            audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
        }
    };

    const stopMusic = () => {
        if (isAudioAllowed && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleStartClick = () => {
        if (audioRef.current) {


        }

        setIsTransitioning(true); // Start the animation


        setTimeout(() => {
            onStart();
        }, 3000);
    };

    return (
        <div className="flex flex-col p-4 items-center justify-center h-screen gap-5">
            <h1 className="font-bold text-2xl text-start font-display">
                It's TIIIIIMMMMMEEEEEE
            </h1>

            <p className="font-light text-sm text-center">
                Bienvenue dans l'application Secret Santa ! Organisez facilement votre
                échange de cadeaux entre amis ou collègues.
            </p>

            {!isAudioAllowed && (
                <button
                    onClick={allowAudio}
                    className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Autoriser l’audio
                </button>
            )}

            <button
                onClick={handleStartClick}
                onMouseEnter={playMusic}
                onMouseLeave={stopMusic}
                className={`gap-3 px-1 flex items-center justify-end rounded-full w-10 h-10 border-red-600 bg-red-600 text-white border-2 transition-all duration-300 hover:w-40 overflow-hidden ${isTransitioning ? 'animate-fadeOut' : ''}`}
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

            {/* Utilise un chemin public */}
            <audio ref={audioRef} src="/secret-santa/assets/itstime.mp3" preload="auto" />

        </div>
    );
}

