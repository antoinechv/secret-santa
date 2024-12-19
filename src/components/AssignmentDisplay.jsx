import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

// Mélange Fisher-Yates pour une répartition aléatoire correcte
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Échanger les éléments
    }
    return shuffled;
};

// Fonction pour générer des attributions robustes sans boucle infinie
const generateAssignments = (participants) => {
    let assignments = [];
    let isValid = false;

    // S'assurer qu'aucune personne ne se tire elle-même
    while (!isValid) {
        let shuffled = shuffleArray(participants);

        // Vérifier que personne ne se tire elle-même
        isValid = shuffled.every((person, index) => person !== participants[index]);

        if (isValid) {
            assignments = participants.map((giver, index) => ({
                giver,
                receiver: shuffled[index],
            }));
        }
    }

    return assignments;
};

export function AssignmentDisplay({ participants }) {
    const [assignments, setAssignments] = useState([]); // Liste des attributions
    const [selectedIndex, setSelectedIndex] = useState(null); // Indice de la carte sélectionnée
    const [isCardLocked, setIsCardLocked] = useState(false); // Bloquer les autres cartes temporairement
    const [chosenAssignments, setChosenAssignments] = useState([]); // Suivi des indices choisis
    const [currentOffererIndex, setCurrentOffererIndex] = useState(0); // Indice de l'offreur actuel

    // Générer les attributions au montage du composant
    useEffect(() => {
        const generatedAssignments = generateAssignments(participants);
        setAssignments(generatedAssignments);
    }, [participants]);

    // Fonction pour gérer la sélection d'une carte
    const selectCard = (index) => {
        const currentOfferer = assignments[currentOffererIndex]?.giver;
        const selectedAssignment = assignments[index];

        // Vérifier que la personne n'a pas déjà été attribuée à un autre
        if (chosenAssignments.includes(index)) {
            alert("Cette personne a déjà été attribuée.");
            return;
        }



        if (!isCardLocked && !chosenAssignments.includes(index)) {
            setSelectedIndex(index);
            setIsCardLocked(true);
        }
    };

    // Fonction pour passer à l'étape suivante
    const handleNext = () => {
        if (selectedIndex === null) return; // Ne pas continuer si aucune carte n'est sélectionnée

        const selectedAssignment = assignments[selectedIndex];
        // Ajouter l'attribution à la liste choisie
        setChosenAssignments((prev) => [...prev, selectedIndex]);

        // Réinitialiser la sélection
        setSelectedIndex(null);
        setIsCardLocked(false);

        // Passer au prochain offreur
        if (currentOffererIndex < assignments.length - 1) {
            setCurrentOffererIndex(currentOffererIndex + 1);
        }
    };

    // Générer un PDF avec les attributions finales
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Attributions Secret Santa", 20, 20);

        let y = 30;
        chosenAssignments.forEach((index) => {
            const { giver, receiver } = assignments[index];
            doc.setFontSize(12);
            doc.text(`${giver} offre un cadeau à ${receiver}`, 20, y);
            y += 10;
        });

        doc.save("attributions.pdf");
    };

    // Vérifier si toutes les cartes ont été choisies
    const allCardsChosen = chosenAssignments.length === assignments.length;

    // Offreur actuel
    const currentOfferer = assignments[currentOffererIndex]?.giver;
    const currentReceiver = assignments[currentOffererIndex]?.receiver;
    return (
        <div className="relative flex flex-col gap-5 items-center justify-center overflow-hidden max-h-[80vh]">
            {currentOfferer && (
                <div className="mb-4 text-xl font-semibold text-center">
                    <p>{currentOfferer}, choisissez une carte.</p>
                </div>
            )}

            {/* Cartes */}
            <div className="flex flex-wrap gap-4 p-4 items-center justify-center overflow-auto">
                {assignments.map((assignment, index) => {
                    const isFlipped = index === selectedIndex;
                    const isLocked = isCardLocked && index !== selectedIndex;
                    const isChosen = chosenAssignments.includes(index);

                    return (
                        <motion.div
                            key={index}
                            className={`p-4 flex items-center justify-center ${
                                isLocked || isChosen ? "pointer-events-none opacity-50" : ""
                            }`}
                            style={{
                                perspective: "1000px",
                                cursor: !isLocked && !isChosen ? "pointer" : "default",
                            }}
                            onClick={() => selectCard(index)}
                        >
                            <motion.div
                                className={`w-50 h-52 relative bg-red-400 rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center ${
                                    isChosen ? "border-4 border-green-500" : ""
                                }`}
                                style={{
                                    transformStyle: "preserve-3d",
                                    backfaceVisibility: "hidden",
                                }}
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Face avant */}
                                <div
                                    className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white text-center"
                                    style={{
                                        display: isFlipped ? "none" : "flex",
                                    }}
                                >
                                    <img
                                        src="./assets/noeud.png"
                                        className="w-16 absolute top-[-2rem]"
                                    />
                                    <div className="text-lg font-semibold" >
                                        {isChosen ? "Déjà choisi" : "Cliquez pour découvrir"}
                                    </div>
                                </div>

                                {/* Face arrière */}
                                <div
                                    className="w-full h-full absolute top-0 left-0 bg-red-400 rounded-2xl p-4 flex flex-col items-center justify-center text-white"
                                    style={{
                                        transform: "rotateY(180deg)",
                                        display: isFlipped ? "flex" : "none",
                                    }}
                                >
                                    <div className="text-sm font-semibold">
                                        Vous offrez un cadeau à {currentReceiver}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bouton "Suivant" */}
            {!allCardsChosen && (
                <button
                    className="relative px-6 py-3 bg-red-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600"
                    onClick={handleNext}
                    disabled={selectedIndex === null}
                >
                    Suivant
                </button>
            )}

            {/* Bouton "Télécharger PDF" */}
            {allCardsChosen && (
                <button
                    className="mt-4 px-4 py-2 rounded-full bg-white text-red-600 hover:scale-105 transform duration-150"
                    onClick={generatePDF}
                >
                    Télécharger le PDF des attributions
                </button>
            )}
        </div>
    );
}
