import { useState, useEffect } from "react";

export function ParticipantInput({
                                     participants,
                                     onAddParticipant,
                                     onRemoveParticipant,
                                 }) {
    const [currentName, setCurrentName] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const addParticipant = () => {
        if (currentName !== "") {
            onAddParticipant(currentName);
            setCurrentName("");
        }
    };

    useEffect(() => {
        // Debugging: log the participants to ensure they are correctly passed
        console.log(participants);
    }, [participants]);  // Watch for changes in the participants prop

    return (
        <div className="space-y-6 p-4">
            <div className="flex space-x-2">
                <input
                    type="text"
                    className="input flex-grow px-4 py-2 border bg-red-500 text-white rounded-full focus:outline-none focus:ring-2"
                    placeholder="Entrez un nom"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addParticipant()}
                />
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    onClick={addParticipant}
                >
                    Ajouter
                </button>
            </div>

            <ul>
                {participants.map((participant, index) => (
                    <li
                        key={index}
                        className="animate-fadeIn mb-2 flex justify-between items-center bg-[#689464] p-6 rounded-full shadow"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex items-center gap-4">
                            <span>{participant || "Nom non disponible"}</span>
                        </div>
                        <div className="relative">
                            <button
                                className="text-white text-2xl font-bold"
                                onClick={toggleMenu}
                            >
                                <span>...</span>
                            </button>
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-10">
                                    <button
                                        className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                                        onClick={() => {
                                            onRemoveParticipant(index);
                                            setMenuOpen(false);  // Close the menu after action
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
