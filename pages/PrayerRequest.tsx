
import React, { useState } from 'react';
import { getScriptureEncouragement } from '../services/geminiService';

const PrayerRequest: React.FC = () => {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (request.trim() === '') {
            setError('Please enter your prayer request.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResponse('');

        const result = await getScriptureEncouragement(request);
        setResponse(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Prayer Request</h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." - Philippians 4:6
                        </p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                            Share your request below and receive instant, scripture-based encouragement from our AI assistant.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-church-maroon focus:border-church-maroon bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Type your prayer request here..."
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 bg-church-maroon text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-church-maroon-dark transition-colors duration-300 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Seeking Encouragement...' : 'Submit Request'}
                        </button>
                    </form>

                    {isLoading && (
                        <div className="text-center mt-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-maroon dark:border-yellow-400 mx-auto"></div>
                        </div>
                    )}

                    {response && !isLoading && (
                        <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg">
                            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 font-poppins mb-2">A Word of Encouragement</h3>
                            <div className="text-yellow-900 dark:text-yellow-200 whitespace-pre-wrap">{response}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrayerRequest;
