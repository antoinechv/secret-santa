import { useState } from "react";
import { motion } from "framer-motion";

export function AssignmentDisplay({ assignments }) {
    // Un seul état pour retourner ou non toutes les cartes
    const [areAllFlipped, setAreAllFlipped] = useState(false);

    // État pour chaque carte (initialement toutes non retournées)
    const [flippedIndexes, setFlippedIndexes] = useState({});

    // Fonction pour retourner une carte spécifique
    const toggleCard = (index) => {
        setFlippedIndexes((prev) => ({
            ...prev,
            [index]: !prev[index], // Inverse l'état de la carte sélectionnée
        }));
    };

    // Fonction pour retourner toutes les cartes
    const toggleAllCards = () => {
        setAreAllFlipped((prev) => !prev); // Toggle entre toutes retournées ou non
    };

    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 gap-4 p-4">
                {assignments.map((assignment, index) => {
                    const isFlipped = flippedIndexes[index] || areAllFlipped; // La carte est retournée si elle est individuelle ou si toutes sont retournées

                    return (
                        <motion.div
                            key={index}
                            className="w-full p-4 flex items-center justify-center"
                            style={{
                                perspective: "1000px", // Perspective 3D pour le retournement
                            }}
                            onClick={() => toggleCard(index)} // Clic pour retourner la carte individuellement
                        >
                            <motion.div
                                className="relative bg-red-400 rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center"
                                style={{
                                    width: "150px", // Taille ajustée de la carte
                                    height: "200px", // Taille ajustée de la carte
                                    transformStyle: "preserve-3d",
                                    backfaceVisibility: "hidden",
                                }}
                                initial={{ rotateY: 0 }}
                                animate={{
                                    rotateY: isFlipped ? 180 : 0, // Retourner la carte individuellement ou toutes en même temps
                                    transition: { duration: 0.5 }, // Durée de l'animation
                                }}
                                key={isFlipped ? "flipped" : "unflipped"} // Ajout d'une clé pour forcer un redémarrage de l'animation
                            >
                                {/* Face avant de la carte (avec le texte "Tourne pour découvrir") */}
                                <div
                                    className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white text-center"
                                    style={{
                                        display: isFlipped ? "none" : "flex", // Cache la face avant quand retournée
                                    }}
                                >
                                    <div className="text-lg font-semibold">Tourne pour découvrir</div>
                                    <img
                                        src="./assets/noeud.png"
                                        className="w-16 absolute top-[-2rem]" // Réduction de la taille de l'image
                                    />
                                </div>

                                {/* Face arrière de la carte (avec les informations de l'assignation) */}
                                <div
                                    className="w-full h-full absolute top-0 left-0 bg-red-400 rounded-2xl p-4 flex flex-col items-center justify-center text-white"
                                    style={{
                                        transform: "rotateY(180deg)",
                                        display: isFlipped ? "flex" : "none", // Affiche uniquement si retourné
                                    }}
                                >
                                    <div className="text-sm font-semibold">{assignment.giver}</div>
                                    <div className="text-xs">offre un cadeau à</div>
                                    <div className="text-sm font-semibold">{assignment.receiver}</div>
                                    <img
                                        src="./assets/noeud.png"
                                        className="w-16 absolute top-[-2rem]" // Réduction de la taille de l'image
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bouton pour retourner toutes les cartes */}
            <button
                onClick={toggleAllCards}
                className="mt-4 px-4 py-2 rounded-full bg-red-600 text-white"
            >
                {areAllFlipped ? "Retourner les cartes" : "Voir les détails"}
            </button>
        </div>
    );
}
