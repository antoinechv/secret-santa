import { useState, useEffect } from "react";
import { ParticipantList } from "./ParticipantList";

export function ParticipantInput({ participants, onAddParticipant, onRemoveParticipant }) {
    const [currentName, setCurrentName] = useState("");
    const [openMenuIndex, setOpenMenuIndex] = useState(null);  // Gérer l'index du participant avec le menu ouvert

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);  // Si c'est déjà ouvert, fermer, sinon ouvrir
    };

    const addParticipant = () => {
        if (currentName !== "") {
            onAddParticipant(currentName);
            setCurrentName("");
        }
    };

    useEffect(() => {
        // Debugging: log the participants to ensure they are correctly passed
        console.log(participants);
    }, [participants]);

    return (
        <div className="flex flex-col items-center gap-5 p-4 overflow-hidden min-h-[40vh] max-h-[80vh]">
            <div className="relative flex items-center w-full">
                <input
                    type="text"
                    className="input w-full px-4 py-2 pr-10 border bg-red-500 text-white rounded-full focus:outline-none focus:ring-2"
                    placeholder="Entrez un nom"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addParticipant()}
                />
                <button
                    className="absolute right-3 bg-red-100 text-red-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white"
                    onClick={addParticipant}
                >
                    +
                </button>
            </div>

            <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="font-poppins font-bold text-3xl">Participants</h2>
                    <span className="font-poppins font-light text-lg text-yellow-400">
                        {participants.length} personnes
                    </span>
                </div>

                <img className="w-20 h-auto" src="./assets/hotte.png" alt="" />
            </div>

            {/* Liste des participants */}
            <ParticipantList
                participants={participants}
                openMenuIndex={openMenuIndex}
                onToggleMenu={toggleMenu}
                onRemoveParticipant={onRemoveParticipant}
            />
        </div>
    );
}
