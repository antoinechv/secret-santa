import { motion } from "framer-motion";

const Card = ({
                  index,
                  assignment,
                  selectedIndex,
                  isCardLocked,
                  isChosen,
                  selectCard,
                  currentReceiver,
              }) => {
    const isFlipped = index === selectedIndex;
    const isLocked = isCardLocked && index !== selectedIndex;

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
                    <div className="text-lg font-semibold">
                        {isChosen ? "Déjà choisi" : "Cliquez pour découvrir"}
                    </div>
                </div>

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
};

export default Card;
