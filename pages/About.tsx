
import React, { useState, useMemo } from 'react';
import { leaders, historyMilestones } from '../data/mockData';
import type { Leader, HistoryMilestone } from '../types';
import LeaderCard from '../components/LeaderCard';
import Modal from '../components/Modal';

const HistoryMilestoneCard: React.FC<{ milestone: HistoryMilestone; align: 'left' | 'right' }> = ({ milestone, align }) => (
    <div className={`mb-8 flex justify-between items-center w-full last:mb-0 ${align === 'left' ? 'flex-row-reverse' : ''}`}>
        <div className="order-1 w-5/12"></div>
        <div className="z-20 flex items-center order-1 bg-church-maroon shadow-xl w-12 h-12 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">{milestone.year}</h1>
        </div>
        <div className="order-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-gray-800 dark:text-gray-100 text-xl">{milestone.title}</h3>
            <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-400">{milestone.description}</p>
        </div>
    </div>
);


const About: React.FC = () => {
    const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
    const [leaderFilter, setLeaderFilter] = useState<string>('All');

    const openModal = (leader: Leader) => setSelectedLeader(leader);
    const closeModal = () => setSelectedLeader(null);
    
    const filteredLeaders = useMemo(() => {
        if (leaderFilter === 'All') return leaders;
        return leaders.filter(l => l.category === leaderFilter);
    }, [leaderFilter]);

    const filterOptions: ('All' | 'Pastor' | 'Deacon' | 'Office Holder')[] = ['All', 'Pastor', 'Deacon', 'Office Holder'];

    return (
        <div className="bg-warm-gray dark:bg-gray-900 font-open-sans">
            {/* Mission & Vision Section */}
            <section className="py-16 md:py-24 text-center bg-white dark:bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">About First Baptist Church Itire</h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                        Loving God, Loving People, Making Disciples
                    </p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins">Our Mission</h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">To love God with all our heart, soul, and mind; to love our neighbors as ourselves; and to fulfill the Great Commission by making disciples of all nations, baptizing them and teaching them to obey everything Jesus has commanded.</p>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 font-poppins">Our Vision</h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">To be a transformative presence in our community, known for our authentic faith, compassionate outreach, and unwavering commitment to biblical truth. We envision a church where people from all walks of life can find a home, grow in their relationship with Christ, and use their gifts to serve others.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our History Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Our Journey of Faith</h2>
                    </div>
                    <div className="relative">
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300 dark:bg-gray-600 -translate-x-1/2"></div>
                        {historyMilestones.map((milestone, index) => (
                            <HistoryMilestoneCard key={`${milestone.year}-${index}`} milestone={milestone} align={index % 2 === 0 ? 'right' : 'left'} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Our Leadership</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Meet the team dedicated to serving our church family.</p>
                        <div className="mt-6 flex justify-center flex-wrap gap-2">
                            {filterOptions.map(option => (
                                <button
                                    key={option}
                                    onClick={() => setLeaderFilter(option)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                                        leaderFilter === option
                                        ? 'bg-church-maroon text-white shadow'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {option === 'Office Holder' ? 'Office Holders' : option === 'All' ? 'All' : `${option}s`}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredLeaders.map(leader => (
                            <LeaderCard key={leader.id} leader={leader} onReadMore={openModal} />
                        ))}
                    </div>
                </div>
            </section>
            
             {selectedLeader && (
                <Modal isOpen={!!selectedLeader} onClose={closeModal}>
                    <div className="p-6 md:p-8 text-center">
                        <img src={selectedLeader.imageUrl} alt={selectedLeader.name} className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-church-maroon dark:border-yellow-400 object-cover" />
                        <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">{selectedLeader.name}</h2>
                        <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4">{selectedLeader.position}</p>
                        <div className="text-left text-gray-700 dark:text-gray-300 space-y-4">
                           {selectedLeader.fullBio.split('\\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default About;