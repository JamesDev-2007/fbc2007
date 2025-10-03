import React from 'react';
import { blogPosts } from '../data/mockData';
import type { BlogPost } from '../types';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
    <div className="p-6">
      <h3 className="text-2xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mb-2">{post.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{post.excerpt}</p>
      <a href="#" className="font-semibold text-church-maroon-dark dark:text-yellow-300 hover:underline">Read Full Post &rarr;</a>
    </div>
  </div>
);

const Blog: React.FC = () => {
  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Our Church Blog</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Insights, stories, and encouragement from our community.
          </p>
        </div>

        <div className="space-y-12">
          {blogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
