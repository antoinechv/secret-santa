import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { generateAssignments } from "../utils/assignmentUtils.jsx";
import Card from "./Card.jsx";

export function AssignmentDisplay({ participants }) {
    const [assignments, setAssignments] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isCardLocked, setIsCardLocked] = useState(false);
    const [chosenAssignments, setChosenAssignments] = useState([]);
    const [currentOffererIndex, setCurrentOffererIndex] = useState(0);

    useEffect(() => {
        const generatedAssignments = generateAssignments(participants);
        setAssignments(generatedAssignments);
    }, [participants]);

    const selectCard = (index) => {
        const currentOfferer = assignments[currentOffererIndex]?.giver;
        const selectedAssignment = assignments[index];

        if (chosenAssignments.includes(index)) {
            alert("Cette personne a déjà été attribuée.");
            return;
        }

        if (!isCardLocked && !chosenAssignments.includes(index)) {
            setSelectedIndex(index);
            setIsCardLocked(true);
        }
    };

    const handleNext = () => {
        if (selectedIndex === null) return;

        setChosenAssignments((prev) => [...prev, selectedIndex]);
        setSelectedIndex(null);
        setIsCardLocked(false);

        if (currentOffererIndex < assignments.length - 1) {
            setCurrentOffererIndex(currentOffererIndex + 1);
        }
    };

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

    const allCardsChosen = chosenAssignments.length === assignments.length;
    const currentOfferer = assignments[currentOffererIndex]?.giver;
    const currentReceiver = assignments[currentOffererIndex]?.receiver;

    return (
        <div className="relative flex flex-col gap-5 items-center justify-center overflow-hidden max-h-[80vh]">
            {currentOfferer && (
                <div className="mb-4 text-xl font-semibold text-center">
                    <p>{currentOfferer}, choisissez une carte.</p>
                </div>
            )}

            <div className="flex flex-wrap gap-4 p-4 items-center justify-center overflow-auto">
                {assignments.map((assignment, index) => (
                    <Card
                        key={index}
                        index={index}
                        assignment={assignment}
                        selectedIndex={selectedIndex}
                        isCardLocked={isCardLocked}
                        isChosen={chosenAssignments.includes(index)}
                        selectCard={selectCard}
                        currentReceiver={currentReceiver}
                    />
                ))}
            </div>

            {!allCardsChosen && (
                <button
                    className="relative px-6 py-3 bg-red-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-red-600"
                    onClick={handleNext}
                    disabled={selectedIndex === null}
                >
                    Suivant
                </button>
            )}

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
