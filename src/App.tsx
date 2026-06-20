import { useEffect, useState, useRef } from 'react'
import './App.css'

const BOOT_LOGS = [
    "Initializing Kitty Terminal v0.8.5...",
    "Loading Cosmic environment variables...",
    "Mounting nebula filesystem...",
    "Starting planetary communication protocols...",
    "Connection established with Regirock interface...",
    "Ready to receive input.",
];


function App() {

    //-----------STATES-----------
    //state to hold logs loaded so far
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
    //auto scroll
    const bottomRef = useRef<HTMLDivElement>(null);
    //boot timer
    const [isBootComplete, setIsBootComplete] = useState(false);
    //pokemonId
    const [pokemonId, setPokemonId] = useState<number | null>(null);

    //-----------EFFECTS----------
    useEffect(() => {
        let currentIndex = 0;
        const randomId = Math.floor(Math.random() * 386) + 1;
        setPokemonId(randomId);

        const interval = setInterval(() => {
            if (currentIndex < BOOT_LOGS.length) {
                setVisibleLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
                currentIndex++;
            }
            else {
                clearInterval(interval);
                setVisibleLogs([]);
                setIsBootComplete(true);
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleLogs]);

    //----------RENDER------------
    return (
        <div className='terminal-window'>
            <div className='terminal-body'>
                {!isBootComplete &&
                    <p> Terminal is booting up .....</p>}

                {visibleLogs.map((log, index) => (
                    <div key={index} className='log-line'>{log}</div>
                ))}
                <div ref={bottomRef} />
                {isBootComplete && (
                    <div className='pokemon-sprite-container'>
                        {/* 
              Alternative formats you can try:
              - GIF style: src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
              - SVG style: src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
            */}
                        <img

                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`}
                            alt='random-pokemon'
                            className='pokemon-sprite'
                        />
                    </div>
                )}
            </div>
        </div>
    )
}


export default App
