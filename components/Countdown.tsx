import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface NextService {
    targetDate: Date;
    name: string;
}

const calculateNextService = (): NextService => {
    const now = new Date();

    const services = [
        { day: 0, hour: 10, name: 'Sunday' },    // Sunday at 10:00 AM
        { day: 2, hour: 18, name: 'Tuesday' },   // Tuesday at 6:00 PM
        { day: 3, hour: 19, name: 'Wednesday' }, // Wednesday at 7:00 PM
    ];

    const upcomingServices = services.map(service => {
        const serviceDate = new Date();
        // Calculate the next occurrence of this day of the week
        serviceDate.setDate(now.getDate() + (service.day - now.getDay() + 7) % 7);
        serviceDate.setHours(service.hour, 0, 0, 0);

        // If the calculated time has already passed today/this week, move to next week
        if (serviceDate.getTime() < now.getTime()) {
            serviceDate.setDate(serviceDate.getDate() + 7);
        }
        return { targetDate: serviceDate, name: service.name };
    });

    // Find the soonest upcoming service
    upcomingServices.sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
    
    return upcomingServices[0];
};

const TimeCard: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-church-maroon-dark text-white rounded-lg shadow-2xl overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-black bg-opacity-10"></div>
            <span key={value} className="text-5xl sm:text-6xl font-bold tracking-wider animate-[pop-in_0.5s_ease-out]">{String(value).padStart(2, '0')}</span>
        </div>
        <span className="mt-3 text-sm sm:text-base uppercase text-gray-600 dark:text-gray-400 font-semibold">{label}</span>
        <style>{`
            @keyframes pop-in {
                0% { transform: scale(0.8); opacity: 0; }
                60% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1.0); opacity: 1; }
            }
            .animate-\\[pop-in_0\\.5s_ease-out\\] {
                animation: pop-in 0.5s ease-out;
            }
        `}</style>
    </div>
);


const Countdown: React.FC = () => {
    const [nextService, setNextService] = useState<NextService>(calculateNextService());
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = nextService.targetDate.getTime() - now.getTime();
            
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                // Time is up, so recalculate for the next service
                setTimeLeft({});
                setNextService(calculateNextService());
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [nextService]);
    
    const getTitle = () => {
        switch(nextService.name) {
            case 'Sunday': return 'Countdown to our next Sunday Service';
            case 'Tuesday': return 'Countdown to our next Tuesday Service';
            case 'Wednesday': return 'Countdown to our Midweek Service';
            default: return 'Join Our Next Service';
        }
    }

    return (
        <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mb-8">{getTitle()}</h2>
                <div className="flex justify-center space-x-3 sm:space-x-6 text-gray-800">
                    {timeLeft.days !== undefined ? (
                        <>
                            <TimeCard value={timeLeft.days} label="Days" />
                            <TimeCard value={timeLeft.hours!} label="Hours" />
                            <TimeCard value={timeLeft.minutes!} label="Minutes" />
                            <TimeCard value={timeLeft.seconds!} label="Seconds" />
                        </>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                           <span className="text-2xl font-semibold text-church-maroon dark:text-yellow-400">Service is Live!</span>
                        </div>
                    )}
                </div>
                 <div className="mt-10">
                    <p className="text-lg">Service Times:</p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                        Sundays @ <strong>10:00 AM</strong> | Tuesdays @ <strong>6:00 PM</strong> | Wednesdays @ <strong>7:00 PM</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Countdown;