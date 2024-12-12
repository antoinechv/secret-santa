export function WelcomeScreen({onStart}) {
    return (
        <div className=" flex flex-col p-4">
            <h1 className="font-bold text-2xl">
                It's TIIIIIMMMMMEEEEE
            </h1>

                <p className=" font-light text-sm ">
                    Bienvenue dans l'application Secret Santa ! Organisez facilement votre
                    échange de cadeaux entre amis ou collègues.
                </p>
                <button
                    onClick={onStart}
                    className=" rounded-full w-10 h-10 border-black border-2 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>

                </button>

        </div>
    );
}
