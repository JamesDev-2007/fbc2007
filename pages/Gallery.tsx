
import React from 'react';
import { galleryImages } from '../data/mockData';

const Gallery: React.FC = () => {
  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Our Gallery</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            A glimpse into our church family and events.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map(image => (
            <div key={image.id} className="group relative aspect-w-1 aspect-h-1">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end p-4 rounded-lg">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
