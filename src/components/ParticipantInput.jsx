// Ce composant affiche la liste des participants avec un style amélioré
// Les boutons sont arrondis, et les participants sont affichés dans des conteneurs arrondis avec des avatars

import { useState } from "react";

export function ParticipantInput({
                                   participants,
                                   onAddParticipant,
                                   onRemoveParticipant,
                                 }) {
  const [currentName, setCurrentName] = useState("");

  const addParticipant = () => {
    if (currentName !== "") {
      onAddParticipant(currentName);
      setCurrentName("");
    }
  };

  return (
      <div className="space-y-6 p-4  ">
        <div className="flex space-x-2">
          <input
              type="text"
              className="input flex-grow px-4 py-2 border bg-red-500 text-white rounded-full focus:outline-none focus:ring-2 "
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
                  className="animate-fadeIn mb-2 flex justify-between items-center bg-gray-100 p-2 rounded shadow"
                  style={{animationDelay: `${index * 0.1}s`}} // Décalage pour un effet échelonné
              >
                <span>{participant}</span>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveParticipant(index)}
                >
                  Supprimer
                </button>
              </li>
          ))}
        </ul>
      </div>
  );
}
