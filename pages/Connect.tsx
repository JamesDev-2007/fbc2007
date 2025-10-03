import React, { useState, useMemo } from 'react';
import { communityPosts } from '../data/mockData';
import type { Post } from '../types';

// Time formatting utility
const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};


const Connect: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(communityPosts.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()));
    const [filter, setFilter] = useState<'All' | 'Prayer' | 'Testimony'>('All');
    
    // Form state
    const [name, setName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [postType, setPostType] = useState<'Prayer' | 'Testimony'>('Prayer');
    const [message, setMessage] = useState('');

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!message.trim()) return;

        const newPost: Post = {
            id: `post-${Date.now()}`,
            name: isAnonymous ? 'Anonymous' : name.trim() || 'Anonymous',
            type: postType,
            message: message.trim(),
            timestamp: new Date(),
            interactions: 0,
        };

        setPosts([newPost, ...posts]);

        // Reset form
        setName('');
        setIsAnonymous(false);
        setMessage('');
        setPostType('Prayer');
    };

    const handleInteraction = (postId: string) => {
        setPosts(posts.map(p => 
            p.id === postId ? { ...p, interactions: p.interactions + 1 } : p
        ));
    };

    const filteredPosts = useMemo(() => {
        if (filter === 'All') return posts;
        return posts.filter(p => p.type === filter);
    }, [posts, filter]);

    return (
        <div className="bg-warm-gray dark:bg-gray-900 font-open-sans">
            {/* Header Section */}
            <section className="relative bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('https://picsum.photos/1200/800?random=50')" }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins">Community Wall</h1>
                    <p className="mt-4 text-lg md:text-xl text-yellow-200">Share your prayer requests and testimonies with our church family.</p>
                </div>
            </section>

            {/* Prayer & Testimony Wall */}
            <section className="py-16 md:py-20 bg-white dark:bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Share & Encourage</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your stories and prayers are a vital part of our community life.</p>
                    </div>

                    {/* Post Form */}
                    <div className="bg-warm-gray dark:bg-gray-700 p-6 rounded-xl shadow-md mb-10">
                        <form onSubmit={handlePostSubmit} className="space-y-4">
                            <div className="flex items-center gap-4">
                                <input type="text" value={name} onChange={e => setName(e.target.value)} disabled={isAnonymous} placeholder="Your Name (Optional)" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-600 dark:border-gray-500 disabled:opacity-50"/>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="h-4 w-4 rounded"/> Post Anonymously</label>
                            </div>
                             <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="postType" value="Prayer" checked={postType === 'Prayer'} onChange={() => setPostType('Prayer')} className="h-4 w-4"/> 🙏 Prayer Request</label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="postType" value="Testimony" checked={postType === 'Testimony'} onChange={() => setPostType('Testimony')} className="h-4 w-4"/> 🙌 Testimony</label>
                            </div>
                            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Share your message here..." className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-600 dark:border-gray-500" required></textarea>
                            <button type="submit" className="w-full bg-church-maroon-dark text-white font-bold py-3 rounded-lg shadow-md hover:bg-church-maroon transition-colors">Post to Wall</button>
                        </form>
                    </div>
                    
                    {/* Filters */}
                    <div className="flex justify-center gap-2 mb-8">
                        {(['All', 'Prayer', 'Testimony'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${filter === f ? 'bg-church-maroon text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
                                {f === 'Prayer' ? '🙏 Prayers' : f === 'Testimony' ? '🙌 Testimonies' : 'All Posts'}
                            </button>
                        ))}
                    </div>

                    {/* Feed */}
                    <div className="space-y-6">
                        {filteredPosts.map(post => (
                            <div key={post.id} className="bg-warm-gray dark:bg-gray-700 p-5 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${post.type === 'Prayer' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>{post.type === 'Prayer' ? '🙏 PRAYER' : '🙌 TESTIMONY'}</span>
                                            <p className="font-bold text-gray-800 dark:text-gray-100">{post.name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{timeAgo(post.timestamp)}</p>
                                    </div>
                                    <button onClick={() => handleInteraction(post.id)} className="flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
                                        {post.type === 'Prayer' ? '🙏' : '🙌'}
                                        <span>{post.type === 'Prayer' ? 'I Prayed' : 'Amen'}</span>
                                        <span className="font-bold text-church-maroon dark:text-yellow-400">{post.interactions}</span>
                                    </button>
                                </div>
                                <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{post.message}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Connect;