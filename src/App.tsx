import { useEffect, useState, useRef } from 'react'
import './App.css'
import BootSequence from './components/BootSequence'
import WelcomeHeader from './components/WelcomeHeader'
import ActivePrompt from './components/ActivePrompt'

// Simple syntax highlighter helper for command history display
const highlightCommand = (cmd: string) => {
    const tokens = cmd.split(/(\s+)/);
    let commandFound = false;
    return tokens.map((token, index) => {
        if (/^\s+$/.test(token)) return <span key={index}>{token}</span>;
        if (!commandFound) {
            commandFound = true;
            return <span key={index} style={{ color: '#89b4fa', fontWeight: 'bold' }}>{token}</span>;
        }
        if (token.startsWith('-')) return <span key={index} style={{ color: '#f2cdcd' }}>{token}</span>;
        if (
            (token.startsWith('"') && token.endsWith('"')) ||
            (token.startsWith("'") && token.endsWith("'"))
        ) {
            return <span key={index} style={{ color: '#a6e3a1' }}>{token}</span>;
        }
        if (token.includes('/')) {
            return <span key={index} style={{ color: '#cdd6f4', textDecoration: 'underline' }}>{token}</span>;
        }
        return <span key={index} style={{ color: '#cdd6f4' }}>{token}</span>;
    });
};

function App() {
    //-----------STATES-----------
    const [isBootComplete, setIsBootComplete] = useState(false);
    const [pokemonId] = useState<number | null>(() => {
        // Generate random pokemon ID once (generations 1, 3, 6 like user's local startup config)
        // Let's pool from Gen 1 (1-151), Gen 3 (252-386), Gen 6 (650-721)
        const gens = [
            Math.floor(Math.random() * 151) + 1,
            Math.floor(Math.random() * 135) + 252,
            Math.floor(Math.random() * 72) + 650
        ];
        return gens[Math.floor(Math.random() * gens.length)];
    });
    const [history, setHistory] = useState<string[]>([]);
    const [lastCommandSuccess, setLastCommandSuccess] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when history changes
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    //-----------HANDLERS---------
    const handleCommandSubmit = (command: string) => {
        const trimmed = command.trim();
        if (trimmed === 'clear') {
            setHistory([]);
            setLastCommandSuccess(true);
            return;
        }

        const validCommands = ['help', 'about', 'projects', 'skills', 'contact', 'pokemon'];
        const baseCmd = trimmed.split(' ')[0];
        const isValid = validCommands.includes(baseCmd);

        setHistory((prev) => [...prev, command]);
        setLastCommandSuccess(trimmed === '' ? true : isValid);
    };

    //----------RENDER------------
    const arrowColor = '#B3BCFD';

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

                        {/* Render past command history with exact styling matching active prompt */}
                        {history.map((cmd, index) => (
                            <div key={index} className='prompt-container history-item'>
                                <div className='prompt-line-1'>
                                    <span style={{ color: arrowColor }}>
                                        ╭╴<span style={{ fontWeight: 'bold', color: arrowColor }}> billa</span> at <span style={{ color: arrowColor }}>~</span>
                                    </span>
                                    <span style={{ color: arrowColor, fontWeight: 'bold' }}>
                                        󱑈 Executed
                                    </span>
                                </div>
                                <div className='prompt-line-2' style={{ color: arrowColor }}>
                                    <span>╰─<span style={{ color: '#B3BCFD', fontWeight: 'bold' }}>󰍟</span></span>
                                    <div className="input-highlight-overlay" style={{ position: 'static' }}>
                                        {highlightCommand(cmd)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Render active prompt */}
                        <ActivePrompt 
                            onSubmit={handleCommandSubmit} 
                            history={history}
                            lastCommandSuccess={lastCommandSuccess}
                        />

                        {/* Scroll Target */}
                        <div ref={bottomRef} />
                    </>
                )}
            </div>
        </div>
    )
}

export default App

