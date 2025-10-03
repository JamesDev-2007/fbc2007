import React from 'react';
import { leaders, blogPosts } from '../data/mockData';
import { NavLink } from 'react-router-dom';

const PastorsCorner: React.FC = () => {
  const pastor = leaders.find(leader => leader.category === 'Pastor');
  const pastorBlogPosts = pastor ? blogPosts.filter(post => post.author === pastor.name) : [];

  if (!pastor) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl">Pastor's information is not available at the moment.</h1>
      </div>
    );
  }

  return (
    <div className="bg-warm-gray dark:bg-gray-900 font-open-sans">
      <section className="bg-church-maroon-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins">Pastor's Corner</h1>
          <p className="mt-4 text-lg md:text-xl text-yellow-200">A Message from Our Shepherd</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1 flex flex-col items-center">
              <img
                src={pastor.imageUrl}
                alt={pastor.name}
                className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-700"
              />
              <h2 className="mt-6 text-2xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">{pastor.name}</h2>
              <p className="text-md font-semibold text-gray-600 dark:text-gray-400">{pastor.position}</p>
            </div>

            <div className="md:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-poppins mb-4">A Heartfelt Welcome</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Grace and peace to you in the name of our Lord and Savior, Jesus Christ!
                </p>
                <p>
                  It is with immense joy that I welcome you to our church's digital home. Whether you are a longtime member, a new visitor, or simply exploring faith, we are so glad you are here. At First Baptist Church Itire, we are a family committed to growing in our love for God and for one another.
                </p>
                <p>
                  My prayer is that you will find this website to be a helpful resource for connecting with our community and discovering the incredible hope we have in Jesus. We invite you to join us for a service, explore our ministries, and find a place where you can belong and grow.
                </p>
                <p>
                  May God's richest blessings be upon you.
                </p>
                <p className="font-semibold mt-4">
                  In His Service,
                  <br />
                  {pastor.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {pastorBlogPosts.length > 0 && (
        <section className="bg-white dark:bg-gray-800 py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">From the Pastor's Desk</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Recent thoughts and writings.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastorBlogPosts.map(post => (
                <div key={post.id} className="bg-warm-gray dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">Published on {post.date}</p>
                  <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                  <NavLink to={`/blog`} className="text-church-maroon-dark dark:text-yellow-300 font-semibold hover:underline mt-4 inline-block">
                    Read More &rarr;
                  </NavLink>
                </div>
              ))}
            </div>
             <div className="text-center mt-12">
                <NavLink to="/blog" className="bg-church-maroon text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    View All Blog Posts
                </NavLink>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PastorsCorner;