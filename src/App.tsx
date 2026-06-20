import { useEffect, useState, useRef } from 'react'
import './App.css'
import BootSequence from './components/BootSequence'
import WelcomeHeader from './components/WelcomeHeader'
import ActivePrompt from './components/ActivePrompt'

function App() {
    //-----------STATES-----------
    const [isBootComplete, setIsBootComplete] = useState(false);
    const [pokemonId, setPokemonId] = useState<number | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    //-----------EFFECTS----------
    // Generate random pokemon ID once on mount
    useEffect(() => {
        const randomId = Math.floor(Math.random() * 386) + 1;
        setPokemonId(randomId);
    }, []);

    // Scroll to bottom when history changes
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    //-----------HANDLERS---------
    const handleCommandSubmit = (command: string) => {
        setHistory((prev) => [...prev, command]);
    };

    //----------RENDER------------
    return (
        <div className='terminal-window'>
            <div className='terminal-body'>
                {/* 1. While booting, show the scrolling logs */}
                {!isBootComplete && (
                    <BootSequence onComplete={() => setIsBootComplete(true)} />
                )}

                {/* 2. When booting finishes, display the header, history, and active prompt */}
                {isBootComplete && (
                    <>
                        <WelcomeHeader pokemonId={pokemonId} />

                        {/* Render past command history */}
                        {history.map((cmd, index) => (
                            <div key={index} className='prompt-container history-item'>
                                <div className='prompt-line-1'>
                                    <span>╭─ 󰊠 billa at ~</span>
                                    <span>🕒 Executed</span>
                                </div>
                                <div className='prompt-line-2'>
                                    <span>╰─&gt; {cmd}</span>
                                </div>
                            </div>
                        ))}

                        {/* Render active prompt */}
                        <ActivePrompt onSubmit={handleCommandSubmit} />
                        
                        {/* Scroll Target */}
                        <div ref={bottomRef} />
                    </>
                )}
            </div>
        </div>
    )
}

export default App
