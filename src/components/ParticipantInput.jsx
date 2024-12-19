import { useState, useEffect } from "react";

export function ParticipantInput({
                                     participants,
                                     onAddParticipant,
                                     onRemoveParticipant,
                                 }) {
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
    }, [participants]); // Watch for changes in the participants prop

    return (
        <div className="flex flex-col items center gap-5 p-4 overflow-hidden max-h-[80vh]">
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
                <div className="flex flex-col gap-2 ">
                    <h2 className="font-poppins font-bold text-3xl">Participants</h2>
                    <span className="font-poppins font-light text-lg text-yellow-400">
            {participants.length} personnes
          </span>
                </div>

                <img className="w-20 h-auto" src="./assets/hotte.png" alt="" />
            </div>
            <ul className="overflow-auto flex flex-col gap-1">
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
                                onClick={() => toggleMenu(index)} // Passe l'index du participant
                            >
                                <span>...</span>
                            </button>
                            {openMenuIndex === index && (  // Vérifie si le menu doit être ouvert pour cet index
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-10">
                                    <button
                                        className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                                        onClick={() => {
                                            onRemoveParticipant(index);
                                            setOpenMenuIndex(null);  // Ferme le menu après l'action
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
