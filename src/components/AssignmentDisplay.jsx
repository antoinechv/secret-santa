import React, { useState } from "react"; // Assure-toi que useState est importé
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

export function AssignmentDisplay({ assignments }) {
    // État pour suivre la carte sélectionnée
    const [selectedIndex, setSelectedIndex] = useState(null);
    // État pour bloquer les autres cartes après sélection
    const [isCardLocked, setIsCardLocked] = useState(false);
    // État pour suivre les cartes déjà choisies
    const [chosenAssignments, setChosenAssignments] = useState([]);
    // État pour suivre les attributions (offreur -> receveur)
    const [attributions, setAttributions] = useState([]);

    // Fonction pour gérer la sélection d'une carte
    const selectCard = (index) => {
        // Vérifie si l'offreur actuel est l'assigné actuel et empêche de choisir sa propre carte
        const currentOffererIndex = chosenAssignments.length;
        const currentOfferer = assignments[currentOffererIndex]?.giver;
        const selectedAssignment = assignments[index];

        if (currentOfferer === selectedAssignment.giver) {
            return; // Bloque la sélection de la carte de l'offreur
        }

        if (!isCardLocked && !chosenAssignments.includes(index)) {
            setSelectedIndex(index);
            setIsCardLocked(true); // Bloquer les autres cartes
        }
    };

    // Fonction pour passer à la carte suivante
    const handleNext = () => {
        const selectedAssignment = assignments[selectedIndex];

        // Ajouter l'attribution (offreur -> receveur)
        setAttributions((prev) => [
            ...prev,
            { offerer: selectedAssignment.giver, receiver: selectedAssignment.receiver },
        ]);

        // Marquer la carte comme "choisie"
        setChosenAssignments((prev) => [...prev, selectedIndex]);

        // Réinitialiser la sélection
        setSelectedIndex(null);
        setIsCardLocked(false);
    };

    // Générer un PDF avec les attributions
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Attributions Secret Santa", 20, 20);

        let y = 30;
        attributions.forEach((item) => {
            doc.setFontSize(12);
            doc.text(`${item.offerer} a attribué à ${item.receiver}`, 20, y);
            y += 10;
        });

        doc.save("attributions.pdf");
    };

    // Vérifier si toutes les cartes ont été choisies
    const allCardsChosen = chosenAssignments.length === assignments.length;

    // Afficher l'offreur actuel (s'il reste des cartes à choisir)
    const currentOfferer =
        assignments.length > 0 && chosenAssignments.length < assignments.length
            ? assignments[chosenAssignments.length].giver
            : "";

    return (
        <div className="relative flex flex-col gap-5 items-center justify-center overflow-hidden max-h-[80vh] ">
            {currentOfferer && (
                <div className="mb-4 text-xl font-semibold text-center">
                    <p> {currentOfferer} choisit une carte.</p>
                </div>
            )}

            <div className="flex flex-wrap gap-4 p-4 items-center justify-center gap-5 overflow-auto">
                {assignments.map((assignment, index) => {
                    const isFlipped = index === selectedIndex;
                    const isLocked = isCardLocked && index !== selectedIndex;
                    const isChosen = chosenAssignments.includes(index);

                    return (
                        <motion.div
                            key={index}
                            className={` p-4 flex items-center justify-center ${isLocked ? 'pointer-events-none opacity-50' : ''}`}
                            style={{
                                perspective: "1000px",
                                cursor: !isLocked && !chosenAssignments.includes(index) ? 'pointer' : 'default',
                            }}
                            onClick={() => selectCard(index)} // Sélectionner une carte
                        >
                            <motion.div
                                className={` w-50 h-52 relative bg-red-400 rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center ${isChosen ? 'border-4 border-green-500' : ''}`}
                                style={{

                                    transformStyle: "preserve-3d",
                                    backfaceVisibility: "hidden",
                                }}
                                initial={{rotateY: 0}}
                                animate={{rotateY: isFlipped ? 180 : 0}}
                                transition={{duration: 0.5}}
                            >
                                {/* Face avant de la carte */}
                                <div
                                    className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white text-center"
                                    style={{
                                        display: isFlipped ? "none" : "flex",
                                    }}
                                >
                                    <div className="text-lg font-semibold">Tourne pour découvrir</div>
                                    <img
                                        src="./assets/noeud.png"
                                        className="w-16 absolute top-[-2rem]"
                                    />
                                </div>

                                {/* Face arrière de la carte */}
                                <div
                                    className="w-full h-full absolute top-0 left-0 bg-red-400 rounded-2xl p-4 flex flex-col items-center justify-center text-white"
                                    style={{
                                        transform: "rotateY(180deg)",
                                        display: isFlipped ? "flex" : "none",
                                    }}
                                >
                                    <div className="text-sm font-semibold">tu offres un cadeau à {assignment.receiver}</div>
                                    <img
                                        src="./assets/noeud.png"
                                        className="w-16 absolute top-[-2rem]"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                    );
                })}
            </div>

            {/* Bouton "Suivant" */}
            <button
                className="relative px-6 py-3 bg-red-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600"
                onClick={handleNext}
                disabled={selectedIndex === null}
            >
                Suivant
            </button>

            {/* Bouton de téléchargement du PDF, visible seulement lorsque toutes les cartes ont été choisies */}
            {allCardsChosen && (
                <button
                    className="mt-4 px-4 py-2 rounded-full bg-white text-red-600 hover:scale-105  transform hover:scale-105 duration-150   "
                    onClick={generatePDF}
                >
                    Télécharger le PDF des attributions
                </button>
            )}
        </div>
    );
}
