import React, { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen.jsx";
import { ParticipantInput } from "./components/ParticipantInput.jsx";
import { AssignmentDisplay } from "./components/AssignmentDisplay.jsx";
import Snowfall from "./components/Snowfall.jsx";
import { Modal } from "./components/Modal.jsx";

export default function App() {
    const [participants, setParticipants] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [currentScreen, setCurrentScreen] = useState("welcome");
    const [modalOpen, setModalOpen] = useState(false);

    // Ajout d'un participant
    const addParticipant = (name) => {
        setParticipants([...participants, name]);
    };

    // Suppression d'un participant
    const removeParticipant = (index) => {
        setParticipants(participants.filter((_, i) => i !== index));
    };

    // Distribution des cadeaux
    const distributeGifts = () => {
        if (participants.length < 2) {
            setModalOpen(true);
            return;
        }

        const shuffled = [...participants].sort(() => Math.random() - 0.5);

        const newAssignments = shuffled.map((giver, index) => ({
            giver,
            receiver: shuffled[(index + 1) % shuffled.length],
        }));

        setAssignments(newAssignments);
        setCurrentScreen("assignments");
    };


    const resetApp = () => {
        setParticipants([]);
        setAssignments([]);
        setCurrentScreen("welcome");
    };

    return (
        <div className="bg-[#badac4] text-white h-screen overflow-hidden bg-grain flex flex-col ">
            <div>
                <Snowfall />
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    message="Il faut au moins 2 participants pour faire un Secret Santa !"
                />
                {currentScreen === "welcome" && (
                    <WelcomeScreen onStart={() => setCurrentScreen("input")} />
                )}
                {currentScreen === "input" && (
                    <div
                        className=" flex flex-col items-center justify-center p-6 rounded-lg animate-fadeIn transition-transform transform duration-500"
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
                                onClick={distributeGifts}
                            >
                                Distribuer
                            </button>
                        </div>
                    </div>
                )}

                {currentScreen === "assignments" && (
                    <div className="flex justify-start md:justify-center items-center flex-col  gap-5 p-2">
                        <h2 className="text-4xl font-bold text-center">
                            Attributions des cadeaux
                        </h2>
                        <AssignmentDisplay
                            assignments={assignments}
                        />

                    </div>
                )}
            </div>
        </div>
    );
}
