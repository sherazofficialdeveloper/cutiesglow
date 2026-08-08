import React from 'react';

export default function BlogPostPage({ params }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900">Blog Post: {params.slug}</h1>
      <p className="mt-4 text-lg text-gray-600">Content coming soon...</p>
    </div>
  );
}