
import React, { useState, useEffect } from 'react';
import { getDailyScripture } from '../services/geminiService';

const DailyScripture: React.FC = () => {
    const [scripture, setScripture] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchScripture = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getDailyScripture();
            setScripture(result);
        } catch (err)
        {
            setError("Failed to load scripture. Please try again later.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchScripture();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-church-maroon dark:border-yellow-400"></div>
                </div>
            );
        }
        if (error) {
            return <p className="text-center text-red-500">{error}</p>;
        }
        if (scripture) {
            // FIX: Split by a unique separator for robust parsing. Handle cases where the separator is missing.
            const parts = scripture.split('||');
            if (parts.length >= 2) {
                const verse = parts[0].trim();
                const encouragement = parts[1].trim();
                return (
                    <div className="text-center">
                        <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-gray-100">
                            <p>"{verse}"</p>
                        </blockquote>
                        <p className="mt-4 text-md text-gray-600 dark:text-gray-400">{encouragement}</p>
                    </div>
                );
            }
            // Fallback for unexpected format
            return (
                <div className="text-center">
                    <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-gray-100">
                        <p>"{scripture}"</p>
                    </blockquote>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 my-8">
            <h3 className="text-2xl font-bold text-center text-church-maroon dark:text-yellow-400 mb-4 font-poppins">A Word for Today</h3>
            <div className="min-h-[120px] flex items-center justify-center">
                {renderContent()}
            </div>
             <div className="text-center mt-4">
                <button onClick={fetchScripture} disabled={isLoading} className="text-sm text-church-maroon dark:text-yellow-400 hover:underline disabled:opacity-50">
                    Get a new verse
                </button>
            </div>
        </div>
    );
};

export default DailyScripture;