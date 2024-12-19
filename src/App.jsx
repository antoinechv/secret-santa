import React, { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen.jsx";
import { ParticipantInput } from "./components/ParticipantInput.jsx";
import { AssignmentDisplay } from "./components/AssignmentDisplay.jsx";
import Snowfall from "./components/Snowfall.jsx";
import { Modal } from "./components/Modal.jsx";

export default function App() {
    const [participants, setParticipants] = useState([]); // Liste des participants
    const [currentScreen, setCurrentScreen] = useState("welcome"); // Gestion de l'écran actif
    const [modalOpen, setModalOpen] = useState(false); // Gestion de l'affichage du modal

    // Ajout d'un participant
    const addParticipant = (name) => {
        if (!name.trim() || participants.includes(name)) return; // Empêcher les doublons ou noms vides
        setParticipants([...participants, name]);
    };

    // Suppression d'un participant
    const removeParticipant = (index) => {
        setParticipants(participants.filter((_, i) => i !== index));
    };

    // Démarrage de l'attribution (vérification des participants)
    const startAssignments = () => {
        if (participants.length < 2) {
            setModalOpen(true); // Affiche un message d'erreur si moins de 2 participants
            return;
        }
        setCurrentScreen("assignments"); // Passe à l'écran d'attribution des cartes
    };

    // Réinitialisation de l'application
    const resetApp = () => {
        setParticipants([]);
        setCurrentScreen("welcome");
    };

    return (
        <div className="bg-[#badac4] text-white h-screen overflow-hidden bg-grain flex flex-col">
            <Snowfall />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                message="Il faut au moins 2 participants pour faire un Secret Santa !"
            />
            {/* Écran d'accueil */}
            {currentScreen === "welcome" && (
                <WelcomeScreen onStart={() => setCurrentScreen("input")} />
            )}

            {/* Écran de saisie des participants */}
            {currentScreen === "input" && (
                <div
                    className="flex flex-col items-center justify-center p-6 rounded-lg animate-fadeIn transition-transform transform duration-500"
                    style={{ animation: "fadeIn 0.5s ease-in-out" }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Ajoutez les participants
                    </h2>
                    <ParticipantInput
                        participants={participants}
                        onAddParticipant={addParticipant}
                        onRemoveParticipant={removeParticipant}
                    />
                    <div className="flex justify-center pt-6">
                        <button
                            className="relative px-6 py-3 bg-red-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600"
                            onClick={startAssignments}
                        >
                            Lancer l'attribution
                        </button>
                    </div>
                </div>
            )}

            {/* Écran d'attribution des cadeaux */}
            {currentScreen === "assignments" && (
                <div className="flex justify-center items-center flex-col gap-5 p-2">
                    <h2 className="text-4xl font-bold text-center">
                        Attributions des cadeaux
                    </h2>
                    <AssignmentDisplay participants={participants} />
                    <button
                        className="mt-4 px-4 py-2 rounded-full bg-white text-red-600 hover:scale-105 transform hover:scale-105 duration-150"
                        onClick={resetApp}
                    >
                        Réinitialiser
                    </button>
                </div>
            )}
        </div>
    );
}
