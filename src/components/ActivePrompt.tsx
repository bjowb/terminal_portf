import { useEffect, useState, useRef } from 'react';

// Helper to format clock time (HH:MM)
const getFormattedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

interface ActivePromptProps {
    onSubmit: (command: string) => void;
}

export default function ActivePrompt({ onSubmit }: ActivePromptProps) {
    const [inputVal, setInputVal] = useState('');
    const [currentTime, setCurrentTime] = useState(getFormattedTime());
    const inputRef = useRef<HTMLInputElement>(null);

    // 1. Clock timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getFormattedTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 2. Global click listener to auto-focus the input anywhere on the screen
    useEffect(() => {
        const handleGlobalClick = () => {
            inputRef.current?.focus();
        };

        // Focus immediately on load
        inputRef.current?.focus();

        // Listen for clicks on the document
        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    // 3. Handle command execution on pressing Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmedCommand = inputVal.trim();
            // We pass the typed command up to the parent App.tsx
            onSubmit(trimmedCommand);
            // Clear the active command prompt input
            setInputVal('');
        }
    };

    return (
        <div className='prompt-container'>
            <div className='prompt-line-1'>
                <span>╭─ 󰊠 billa at ~</span>
                <span>🕒 {currentTime}</span>
            </div>
            <div className='prompt-line-2'>
                <span>╰─&gt; </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
        </div>
    );
}
