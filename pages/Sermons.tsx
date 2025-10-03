
import React, { useState, useEffect, useMemo } from 'react';
import { sermons } from '../data/mockData';
import type { Sermon } from '../types';
import { findRelatedSermons } from '../services/geminiService';

const SermonCard: React.FC<{ sermon: Sermon }> = ({ sermon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
    <div className="p-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(sermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <h3 className="text-xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mt-1">{sermon.title}</h3>
      <p className="text-md text-gray-700 dark:text-gray-300 mt-1">by {sermon.preacher}</p>
      <p className="text-gray-600 dark:text-gray-400 mt-3 h-20 overflow-hidden">{sermon.description}</p>
      <div className="mt-4 flex items-center space-x-4">
        {sermon.videoUrl && <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className="text-church-maroon-dark dark:text-yellow-300 font-semibold hover:underline">Watch Video</a>}
        {sermon.audioUrl && <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer" className="text-church-maroon-dark dark:text-yellow-300 font-semibold hover:underline">Listen Audio</a>}
      </div>
       <div className="mt-4 flex flex-wrap gap-2">
            {sermon.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>
    </div>
  </div>
);

const Sermons: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [preacherFilter, setPreacherFilter] = useState('All Preachers');
    const [tagFilter, setTagFilter] = useState('All Topics');
    const [displayedSermons, setDisplayedSermons] = useState<Sermon[]>(sermons);
    const [isLoading, setIsLoading] = useState(false);

    const uniquePreachers = useMemo(() => ['All Preachers', ...Array.from(new Set(sermons.map(s => s.preacher)))], []);
    const uniqueTags = useMemo(() => ['All Topics', ...Array.from(new Set(sermons.flatMap(s => s.tags)))], []);

    useEffect(() => {
        const handler = setTimeout(async () => {
            const applyLocalFilters = (sermonsToFilter: Sermon[]) => {
                let filtered = sermonsToFilter;
                if (preacherFilter !== 'All Preachers') {
                    filtered = filtered.filter(s => s.preacher === preacherFilter);
                }
                if (tagFilter !== 'All Topics') {
                    filtered = filtered.filter(s => s.tags.includes(tagFilter));
                }
                return filtered;
            };

            if (searchTerm.trim() !== '') {
                setIsLoading(true);
                try {
                    const relatedIds = await findRelatedSermons(sermons, searchTerm);
                    const relatedSermons = sermons.filter(s => relatedIds.includes(s.id));
                    setDisplayedSermons(applyLocalFilters(relatedSermons));
                } catch (error) {
                    console.error("Failed to fetch related sermons, using fallback search", error);
                    const lowerCaseSearchTerm = searchTerm.toLowerCase();
                    const textFiltered = sermons.filter(sermon =>
                        sermon.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                        sermon.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                        sermon.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
                    );
                    setDisplayedSermons(applyLocalFilters(textFiltered));
                } finally {
                    setIsLoading(false);
                }
            } else {
                setDisplayedSermons(applyLocalFilters(sermons));
            }
        }, 300); // Debounce

        return () => clearTimeout(handler);
    }, [searchTerm, preacherFilter, tagFilter]);


  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Our Sermons</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Listen to messages that inspire, challenge, and encourage.
          </p>
        </div>
        
        <div className="mb-8 max-w-2xl mx-auto space-y-4">
             <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sermons by topic, speaker, or keyword..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-church-maroon focus:border-church-maroon bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <div className="flex flex-col sm:flex-row gap-4">
                <select
                    value={preacherFilter}
                    onChange={(e) => setPreacherFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-church-maroon focus:border-church-maroon bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                    {uniquePreachers.map(preacher => <option key={preacher} value={preacher}>{preacher}</option>)}
                </select>
                <select
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-church-maroon focus:border-church-maroon bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                    {uniqueTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>
            </div>
        </div>

        {isLoading ? (
            <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-maroon dark:border-yellow-400 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Finding relevant sermons...</p>
            </div>
        ) : (
            displayedSermons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedSermons.map(sermon => (
                    <SermonCard key={sermon.id} sermon={sermon} />
                ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">No Sermons Found</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">We couldn't find any sermons matching your filters. Try a different selection.</p>
                </div>
            )
        )}
      </div>
    </div>
  );
};

export default Sermons;
