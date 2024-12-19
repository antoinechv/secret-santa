export function ParticipantList({
                                    participants,
                                    openMenuIndex,
                                    onToggleMenu,
                                    onRemoveParticipant,
                                }) {
    return (
        <ul className="overflow-auto flex flex-col gap-1 w-full">
            {participants.map((participant, index) => (
                <li
                    key={index}
                    className="animate-fadeIn  flex justify-between items-center bg-[#689464] p-6 rounded-full shadow"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="flex items-center gap-4">
                        <span>{participant || "Nom non disponible"}</span>
                    </div>
                    <div className="relative">
                        <button
                            className="text-white text-2xl font-bold"
                            onClick={() => onToggleMenu(index)} // Passe l'index du participant
                        >
                            <span>...</span>
                        </button>
                        {openMenuIndex === index && (  // Vérifie si le menu doit être ouvert pour cet index
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-10">
                                <button
                                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                                    onClick={() => {
                                        onRemoveParticipant(index);
                                        onToggleMenu(null);  // Ferme le menu après l'action
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
    );
}
