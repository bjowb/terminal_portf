import { useEffect, useState, useRef } from 'react';

// Helper to format clock time (HH:MM)
const getFormattedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

// Available commands for auto-suggestion / auto-completion
const VALID_COMMANDS = ['help', 'about', 'projects', 'skills', 'contact', 'clear', 'pokemon'];

interface ActivePromptProps {
    onSubmit: (command: string) => void;
    history: string[];
    lastCommandSuccess: boolean;
}

export default function ActivePrompt({ onSubmit, history, lastCommandSuccess }: ActivePromptProps) {
    const [inputVal, setInputVal] = useState('');
    const [currentTime, setCurrentTime] = useState(getFormattedTime());
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [suggestion, setSuggestion] = useState('');
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

        inputRef.current?.focus();
        document.addEventListener('click', handleGlobalClick);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    // 3. Zsh Autosuggestions: match typed input to valid commands or history
    useEffect(() => {
        if (!inputVal) {
            setSuggestion('');
            return;
        }

        // Search in valid commands first, then in history (most recent first)
        const match =
            VALID_COMMANDS.find((cmd) => cmd.startsWith(inputVal) && cmd !== inputVal) ||
            [...history].reverse().find((cmd) => cmd.startsWith(inputVal) && cmd !== inputVal);

        if (match) {
            // Suggestion is the remaining part of the matching word
            setSuggestion(match.slice(inputVal.length));
        } else {
            setSuggestion('');
        }
    }, [inputVal, history]);

    // 4. Handle special keys (Enter, Up, Down, Tab, ArrowRight)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmedCommand = inputVal.trim();
            onSubmit(trimmedCommand || '');
            setInputVal('');
            setHistoryIndex(-1);
            setSuggestion('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;

            const nextIndex = historyIndex + 1;
            if (nextIndex < history.length) {
                setHistoryIndex(nextIndex);
                setInputVal(history[history.length - 1 - nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = historyIndex - 1;
            if (nextIndex >= 0) {
                setHistoryIndex(nextIndex);
                setInputVal(history[history.length - 1 - nextIndex]);
            } else {
                setHistoryIndex(-1);
                setInputVal('');
            }
        } else if (e.key === 'Tab' || (e.key === 'ArrowRight' && inputRef.current?.selectionStart === inputVal.length)) {
            // Auto-complete suggestion if available
            if (suggestion) {
                e.preventDefault();
                setInputVal((prev) => prev + suggestion);
                setSuggestion('');
            }
        }
    };

    // 5. Zsh Syntax Highlighting Simulator
    const renderHighlightedText = () => {
        if (!inputVal) return null;

        // RegEx to split text into tokens while preserving whitespace
        const tokens = inputVal.split(/(\s+)/);
        let commandFound = false;

        return tokens.map((token, index) => {
            if (/^\s+$/.test(token)) {
                return <span key={index}>{token}</span>;
            }

            // The first non-whitespace word is colored as command (blue `#89b4fa`)
            if (!commandFound) {
                commandFound = true;
                return (
                    <span key={index} style={{ color: '#89b4fa', fontWeight: 'bold' }}>
                        {token}
                    </span>
                );
            }

            // Options like -s, --help (flamingo `#f2cdcd`)
            if (token.startsWith('-')) {
                return (
                    <span key={index} style={{ color: '#f2cdcd' }}>
                        {token}
                    </span>
                );
            }

            // Strings wrapped in quotes (green `#a6e3a1`)
            if (
                (token.startsWith('"') && token.endsWith('"')) ||
                (token.startsWith("'") && token.endsWith("'"))
            ) {
                return (
                    <span key={index} style={{ color: '#a6e3a1' }}>
                        {token}
                    </span>
                );
            }

            // Paths containing slashes (white `#cdd6f4` underlined)
            if (token.includes('/')) {
                return (
                    <span key={index} style={{ color: '#cdd6f4', textDecoration: 'underline' }}>
                        {token}
                    </span>
                );
            }

            // Default arguments (text color `#cdd6f4`)
            return (
                <span key={index} style={{ color: '#cdd6f4' }}>
                    {token}
                </span>
            );
        });
    };

    // Colors matching your Starship 'normal' palette
    const arrowColor = '#B3BCFD';
    const characterColor = lastCommandSuccess ? '#B3BCFD' : '#f38ba8';

    return (
        <div className="prompt-container">
            {/* Top line of prompt: ╭╴  billa at ~  [fill]  󱑈 HH:MM */}
            <div className="prompt-line-1">
                <span style={{ color: arrowColor }}>
                    ╭╴<span style={{ fontWeight: 'bold', color: arrowColor }}> billa</span> at <span style={{ color: arrowColor }}>~</span>
                </span>
                <span style={{ color: arrowColor, fontWeight: 'bold' }}>
                    󱑈 {currentTime}
                </span>
            </div>

            {/* Bottom line: ╰─󰍟 [input] */}
            <div className="prompt-line-2" style={{ color: arrowColor }}>
                <span>╰─<span style={{ color: characterColor, fontWeight: 'bold' }}>󰍟</span></span>
                
                <div className="input-wrapper">
                    {/* The highlighter overlay layer (renders text with colors) */}
                    <div className="input-highlight-overlay">
                        {renderHighlightedText()}
                        {/* Auto-suggestion inline text (gray `#7f849c`) */}
                        {suggestion && (
                            <span className="suggestion-ghost">{suggestion}</span>
                        )}
                    </div>

                    {/* The real input (transparent, overlayed on top) */}
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
        </div>
    );
}

