// src/components/StatsCounter.jsx
import React, { useEffect, useRef, useState } from "react";

const StatsCounter = ({ stats }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [counters, setCounters] = useState({
        totalUsers: 0,
        resolved: 0,
        pending: 0,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.5 } // trigger when 50% visible
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;

        const duration = 1500; // animation duration in ms
        const frameRate = 20; // ms per frame
        const totalFrames = Math.round(duration / frameRate);

        const animateCount = (key, endValue) => {
            let frame = 0;
            const counterInterval = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                setCounters((prev) => ({
                    ...prev,
                    [key]: Math.floor(progress * endValue),
                }));
                if (frame === totalFrames) clearInterval(counterInterval);
            }, frameRate);
        };

        animateCount("totalUsers", stats.totalUsers);
        animateCount("resolved", stats.resolved);
        animateCount("pending", stats.pending);
    }, [visible, stats]);

    return (
        <section ref={ref} className="bg-cyan-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                    <h3 className="text-4xl font-extrabold">{counters.totalUsers}</h3>
                    <p>Total Registered Users</p>
                </div>
                <div>
                    <h3 className="text-4xl font-extrabold">{counters.resolved}</h3>
                    <p>Issues Resolved</p>
                </div>
                <div>
                    <h3 className="text-4xl font-extrabold">{counters.pending}</h3>
                    <p>Issues Pending</p>
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
