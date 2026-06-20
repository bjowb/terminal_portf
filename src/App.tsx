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

const getFormattedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}


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
    //current time
    const [currentTime, setCurrentTime] = useState(getFormattedTime());


    //-----------EFFECTS----------
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);
        return () => clearInterval(timer);
    }, [])
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
                {visibleLogs.map((log, index) => (
                    <div key={index} className='log-line'>{log}</div>
                ))}
                <div ref={bottomRef} />
                {isBootComplete && (
                    <pre className='ascii-banner'>
{`      _  ___ _   _
     | |/ (_) |_| |_ _  _
     | ' <| |  _|  _| || |
     |_|\\_\\_|\\__|\\__|\\_, |
                     |__/`}
                    </pre>
                )}

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

                {isBootComplete && (
                    <div className='prompt-container'>
                        <div className='prompt-line-1'>
                            <span>╭─ 󰊠 billa at ~</span>
                            <span>🕒 {currentTime}</span>
                        </div>
                        <div className='prompt-line-2'>
                            <span>╰─&gt; </span>
                            <span className='cursor'>█</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default App
