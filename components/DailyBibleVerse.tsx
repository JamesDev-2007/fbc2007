// FIX: Create DailyBibleVerse.tsx file to resolve "not a module" error.
import React, { useState, useEffect } from 'react';
import { getDailyScripture } from '../services/geminiService';

const DailyBibleVerse: React.FC = () => {
    const [verseInfo, setVerseInfo] = useState({ verse: '', encouragement: '' });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchVerse = async () => {
            setIsLoading(true);
            try {
                const result = await getDailyScripture();
                // FIX: Check for a valid, non-empty result before attempting to split.
                // This prevents the "Cannot read properties of undefined (reading 'split')" error.
                if (!result) {
                    throw new Error("API returned an empty scripture.");
                }
                const parts = result.split('||');
                if (parts.length >= 2) {
                    setVerseInfo({ verse: parts[0].trim(), encouragement: parts[1].trim() });
                } else {
                    setVerseInfo({ verse: result.trim(), encouragement: '' });
                }
            } catch (err) {
                console.error(err);
                // Fallback to a default verse on any error
                setVerseInfo({ verse: "'The Lord is my shepherd; I shall not want.' - Psalm 23:1", encouragement: "This verse is a comforting reminder that in all circumstances, God provides for our needs." });
            } finally {
                setIsLoading(false);
            }
        };
        fetchVerse();
    }, []);

    return (
        <section className="bg-church-maroon-dark text-white py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold font-poppins mb-4">Verse of the Day</h2>
                {isLoading ? (
                    <div className="animate-pulse h-24">
                        <div className="h-6 bg-white/20 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-white/20 rounded w-full mt-4 mx-auto"></div>
                    </div>
                ) : (
                    <>
                        <blockquote className="text-2xl italic font-light">
                            <p>"{verseInfo.verse}"</p>
                        </blockquote>
                        {verseInfo.encouragement && <p className="mt-4 text-yellow-200">{verseInfo.encouragement}</p>}
                    </>
                )}
            </div>
        </section>
    );
};

export default DailyBibleVerse;