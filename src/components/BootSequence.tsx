import { useEffect, useState, useRef } from 'react';

const BOOT_LOGS = [
    "Initializing Kitty Terminal v0.8.5...",
    "Loading Cosmic environment variables...",
    "Mounting nebula filesystem...",
    "Starting planetary communication protocols...",
    "Connection established with Regirock interface...",
    "Ready to receive input.",
];

interface BootSequenceProps {
    onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
    const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    // 1. Log simulation effect
    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < BOOT_LOGS.length) {
                setVisibleLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
                onComplete(); // 🚀 Notify the parent (App.tsx) that boot is done!
            }
        }, 300);

        return () => clearInterval(interval);
    }, [onComplete]);

    // 2. Auto-scroll effect
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleLogs]);

    return (
        <>
            <p>Terminal is booting up .....</p>
            {visibleLogs.map((log, index) => (
                <div key={index} className='log-line'>{log}</div>
            ))}
            <div ref={bottomRef} />
        </>
    );
}
