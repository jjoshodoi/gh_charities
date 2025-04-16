import React, { useState } from 'react';

const CharityDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Health', 'Education', 'Youth', 'Community'];

  const charities = [
    {
      id: 'ghana-health',
      name: 'Ghana Health Foundation',
      logo: '/assets/logos/logo1.jpg', 
      category: 'Health',
      shortDescription: 'Delivering healthcare services to underserved communities in Ghana.',
    },
    {
      id: 'education-for-ghana',
      name: 'Education for Ghana',
      logo: '/assets/logos/logo2.jpg',
      category: 'Education',
      shortDescription: 'Improving access to education for children in rural Ghana.',
    },
    {
      id: 'uk-ghana-youth',
      name: 'UK-Ghana Youth Connect',
      logo: '/assets/logos/logo3.jpg',
      category: 'Youth',
      shortDescription: 'Empowering Ghanaian youth through mentorship and community projects.',
    },
    // Add more entries here...
  ];

  const filteredCharities = charities.filter((charity) => {
    const matchesCategory = selectedCategory === 'All' || charity.category === selectedCategory;
    const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charity.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-[#2C6A4D] font-serif px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">UK-Ghana Charity Directory</h1>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search charities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCharities.length > 0 ? (
          filteredCharities.map((charity) => (
            <div key={charity.id} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
              <img src={charity.logo} alt={`${charity.name} logo`} className="h-20 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-center">{charity.name}</h2>
              <p className="text-sm mt-2 text-center">{charity.shortDescription}</p>
              <div className="mt-4 text-center">
                <a
                  href={`/charities/${charity.id}`}
                  className="inline-block bg-[#2C6A4D] text-[#F6A800] px-4 py-2 rounded"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No charities found.</p>
        )}
      </div>
    </div>
  );
};

export default CharityDirectoryPage;