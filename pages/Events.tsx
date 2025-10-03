
import React, { useState, useMemo } from 'react';
import { events as mockEvents } from '../data/mockData';
import type { Event, EventCategory } from '../types';
import Modal from '../components/Modal';
import { 
    MapPinIcon, ClockIcon, ShareIcon, CalendarIcon, 
    ChevronLeftIcon, ChevronRightIcon, PrinterIcon, UserIcon 
} from '../components/icons';

const eventCategories: EventCategory[] = ['Major Program', 'Regular Service', 'Youth Program', 'Special Event'];

const getCategoryColor = (category: EventCategory): string => {
    switch (category) {
        case 'Major Program': return 'bg-red-500 border-red-500';
        case 'Regular Service': return 'bg-blue-500 border-blue-500';
        case 'Youth Program': return 'bg-green-500 border-green-500';
        case 'Special Event': return 'bg-yellow-500 border-yellow-500';
        default: return 'bg-gray-500 border-gray-500';
    }
};

// Helper to generate recurring event instances for a given month
const generateEventsForMonth = (events: Event[], date: Date): Event[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const monthlyEvents: Event[] = [];

    events.forEach(event => {
        if (event.isRecurring && typeof event.recurringDay === 'number') {
            let current = new Date(startDate);
            while (current.getMonth() === month) {
                if (current.getDay() === event.recurringDay) {
                    monthlyEvents.push({
                        ...event,
                        // Create a unique ID for this instance
                        id: `${event.id}-${current.toISOString().slice(0, 10)}`,
                        date: current.toISOString().slice(0, 10),
                    });
                }
                current.setDate(current.getDate() + 1);
            }
        } else {
            const eventDate = new Date(event.date + 'T00:00:00');
            if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
                monthlyEvents.push(event);
            }
        }
    });
    return monthlyEvents;
};

// Helper to create an .ics file for adding to calendar
const createIcsFile = (event: Event) => {
    const startDate = new Date(`${event.date} ${event.time}`);
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Assume 2-hour duration

    const toUTC = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `UID:${event.id}@fbcitire.org`,
        `SUMMARY:${event.title}`,
        `DTSTAMP:${toUTC(new Date())}`,
        `DTSTART:${toUTC(startDate)}`,
        `DTEND:${toUTC(endDate)}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
};

const Events: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [activeFilters, setActiveFilters] = useState<EventCategory[]>(eventCategories);

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const handleFilterToggle = (category: EventCategory) => {
        setActiveFilters(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const allEventsForMonth = useMemo(() => generateEventsForMonth(mockEvents, currentDate), [currentDate]);
    const filteredEventsForMonth = allEventsForMonth.filter(e => activeFilters.includes(e.category));

    const eventsByDate = useMemo(() => {
        return filteredEventsForMonth.reduce((acc, event) => {
            const day = new Date(event.date + 'T00:00:00').getDate();
            if (!acc[day]) acc[day] = [];
            acc[day].push(event);
            return acc;
        }, {} as Record<number, Event[]>);
    }, [filteredEventsForMonth]);

    const today = new Date();
    
    const upcomingEvents = useMemo(() => 
        mockEvents
            .flatMap(event => {
                if (!event.isRecurring) {
                    return new Date(event.date) >= new Date(today.toDateString()) ? [event] : [];
                }
                // Generate next 5 occurrences for recurring events
                const occurrences = [];
                let d = new Date(today);
                d.setDate(d.getDate() + (event.recurringDay! - d.getDay() + 7) % 7);
                for(let i=0; i<5; i++) {
                    occurrences.push({...event, date: new Date(d).toISOString().slice(0,10)});
                    d.setDate(d.getDate() + 7);
                }
                return occurrences;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5),
    []);

    const pastEvents = useMemo(() => 
        mockEvents
            .filter(e => !e.isRecurring && new Date(e.date) < new Date(today.toDateString()))
            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 4), 
    []);


    return (
        <div className="bg-warm-gray dark:bg-gray-900 font-open-sans">
             <style>
                {`
                @media print {
                    body * { visibility: hidden; }
                    .printable-calendar, .printable-calendar * { visibility: visible; }
                    .printable-calendar { position: absolute; left: 0; top: 0; width: 100%; }
                    .no-print { display: none !important; }
                }
                `}
            </style>
            <section className="bg-church-maroon-dark text-white py-20 text-center no-print">
                <h1 className="text-4xl md:text-5xl font-bold font-poppins">Church Events Calendar</h1>
                <p className="mt-4 text-lg md:text-xl text-yellow-200">Stay updated with all upcoming services, programs, and activities.</p>
            </section>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-2">
                        {/* Calendar Component */}
                        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg printable-calendar">
                            <div className="flex justify-between items-center mb-4">
                                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 no-print" aria-label="Previous month"><ChevronLeftIcon className="w-6 h-6"/></button>
                                <h2 className="text-xl sm:text-2xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">{monthName} {year}</h2>
                                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 no-print" aria-label="Next month"><ChevronRightIcon className="w-6 h-6"/></button>
                            </div>
                            <div className="mb-4 flex flex-wrap justify-center gap-2 no-print">
                                {eventCategories.map(cat => (
                                    <button key={cat} onClick={() => handleFilterToggle(cat)} className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${activeFilters.includes(cat) ? `${getCategoryColor(cat).split(' ')[0]} text-white` : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                        {cat}
                                    </button>
                                ))}
                                <button onClick={() => window.print()} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-4" aria-label="Print calendar">
                                    <PrinterIcon className="w-5 h-5"/>
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="py-2">{day}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} className="border rounded-lg border-gray-200 dark:border-gray-700/50"></div>)}
                                {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                                    const day = dayIndex + 1;
                                    const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
                                    return (
                                        <div key={day} className={`border rounded-lg p-1.5 min-h-[100px] sm:min-h-[120px] transition-colors ${isToday ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/50'}`}>
                                            <time dateTime={`${year}-${month + 1}-${day}`} className={`text-xs font-semibold ${isToday ? 'text-yellow-600 dark:text-yellow-300' : 'text-gray-700 dark:text-gray-300'}`}>{day}</time>
                                            <div className="mt-1 space-y-1">
                                                {(eventsByDate[day] || []).map(event => (
                                                    <button key={event.id} onClick={() => setSelectedEvent(event)} className={`w-full text-left text-white text-[10px] px-1.5 py-0.5 rounded truncate ${getCategoryColor(event.category)}`}>
                                                        {event.title}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events List */}
                    <div className="mt-12 lg:mt-0 no-print">
                        <h3 className="text-2xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mb-4">Upcoming Events</h3>
                        <div className="space-y-4">
                            {upcomingEvents.map(event => (
                                <div key={event.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-4">
                                    <div className={`flex-shrink-0 w-12 h-12 text-center text-white rounded-md flex flex-col justify-center items-center ${getCategoryColor(event.category).split(' ')[0]}`}>
                                        <span className="text-xs font-bold">{new Date(event.date + 'T00:00:00').toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-xl font-bold">{new Date(event.date + 'T00:00:00').getDate()}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100">{event.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                                        <button onClick={() => setSelectedEvent(event)} className="text-sm text-church-maroon-dark dark:text-yellow-300 font-semibold hover:underline mt-1">More Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                 {/* Past Events Gallery */}
                <section className="mt-16 md:mt-24 no-print">
                    <h2 className="text-3xl font-bold text-center text-church-maroon dark:text-yellow-400 font-poppins mb-8">Past Event Highlights</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pastEvents.map(event => (
                             <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
                                <img src={event.imageUrl} alt={event.title} className="h-40 w-full object-cover"/>
                                <div className="p-4">
                                    <h3 className="font-bold truncate text-gray-800 dark:text-gray-100">{event.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(event.date + 'T00:00:00').getFullYear()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Event Details Modal */}
            {selectedEvent && (
                <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
                    <div>
                        <img src={selectedEvent.imageUrl || 'https://picsum.photos/800/400?random=1'} alt={selectedEvent.title} className="w-full h-48 object-cover rounded-t-lg"/>
                        <div className="p-6 md:p-8">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${getCategoryColor(selectedEvent.category).split(' ')[0]}`}>{selectedEvent.category}</span>
                            <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mt-3">{selectedEvent.title}</h2>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="w-5 h-5"/>
                                    <span>{new Date(selectedEvent.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="w-5 h-5"/>
                                    <span>{selectedEvent.time}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPinIcon className="w-5 h-5"/>
                                    <span>{selectedEvent.location}</span>
                                </div>
                            </div>
                            {selectedEvent.guestSpeakers && (
                                <div className="flex items-center space-x-2 mt-4 text-gray-600 dark:text-gray-400">
                                    <UserIcon className="w-5 h-5"/>
                                    <span>Guest Speaker(s): {selectedEvent.guestSpeakers.join(', ')}</span>
                                </div>
                            )}
                            <p className="mt-6 text-gray-700 dark:text-gray-300">{selectedEvent.description}</p>
                            
                            <div className="mt-6 h-48 rounded-lg overflow-hidden border dark:border-gray-700">
                                <iframe
                                    className="w-full h-full"
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedEvent.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
                                </iframe>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <ShareIcon className="w-5 h-5"/>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">Facebook</a>
                                    <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${selectedEvent.title}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">Twitter</a>
                                </div>
                                <a href={createIcsFile(selectedEvent)} download={`${selectedEvent.title}.ics`} className="bg-church-maroon text-white font-bold py-2 px-5 rounded-full shadow-md hover:bg-church-maroon-dark transition-colors duration-300 inline-flex items-center space-x-2">
                                    <CalendarIcon className="w-5 h-5"/>
                                    <span>Add to Calendar</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Events;