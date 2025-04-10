import { useEffect, useState } from 'react';
import { FlyProvider } from './FlyProvider';

const Fly = () => {
    const [position, setPosition] = useState({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
    });
    const [rotation, setRotation] = useState(0);

    const { hasFly } = FlyProvider.use();
    useEffect(() => {
        if (!hasFly) {
            return;
        }
        const interval = setInterval(() => {
            setPosition((prev) => {
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 100 + 10;
                const newX = Math.max(
                    0,
                    Math.min(
                        window.innerWidth,
                        prev.x + Math.cos(angle) * distance
                    )
                );
                const newY = Math.max(
                    0,
                    Math.min(
                        window.innerHeight,
                        prev.y + Math.sin(angle) * distance
                    )
                );
                setRotation(
                    (Math.atan2(newY - prev.y, newX - prev.x) * 180) / Math.PI
                );
                return { x: newX, y: newY };
            });
        }, Math.random() * 100 + 100);

        return () => {
            clearInterval(interval);
        };
    }, [hasFly]);

    return (
        <>
            <div
                onDragStart={() => alert('Fly clicked!')}
                onClick={() => alert('Fly clicked!')}
                style={{
                    transition: 'all 0.3s ease',
                    position: 'fixed',
                    height: '8px',
                    width: '8px',
                    zIndex: 1000,
                    transform: `rotate(${rotation + 90}deg)`,
                    backgroundImage: "url('/fly.png')",
                    backgroundSize: 'contain',
                    opacity: hasFly ? 0.2 : 0,
                    top: position.y,
                    left: position.x,
                    pointerEvents: 'none',
                }}
                className="fly"
            />
        </>
    );
};

export default Fly;
