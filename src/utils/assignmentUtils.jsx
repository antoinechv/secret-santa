// Mélange Fisher-Yates pour une répartition aléatoire correcte
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Échanger les éléments
    }
    return shuffled;
};

// Fonction pour générer des attributions robustes sans boucle infinie
export const generateAssignments = (participants) => {
    let assignments = [];
    let isValid = false;

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
