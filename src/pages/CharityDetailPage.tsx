import React from 'react';
import { Link } from 'react-router-dom';
// import logoPic from '../assets/testpic1.jpg'


const CharityDetailPage = () => {
  const charity = {
    name: 'Ghana Health Foundation',
    logo: "/assets/logos/logo1.jpg", 
    mission: 'Providing essential healthcare services in underserved Ghanaian communities.',
    about:
      'Ghana Health Foundation is committed to delivering quality healthcare and resources to rural areas in Ghana. We partner with local clinics and UK-based donors to improve lives through sustainable health initiatives.',
    contact: {
      email: 'info@ghanahealth.org',
      phone: '+44 1234 567890',
      website: 'https://ghanahealth.org',
    },
    events: [
      {
        title: 'Free Medical Outreach in Kumasi',
        date: '20 July 2024',
        description: 'Join us in Kumasi for a health screening event open to the public.',
      },
    ],
  };

  return (
    <div className="bg-white text-[#2C6A4D] font-serif px-6 py-12 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center mb-10">
        <img src={charity.logo} alt={`${charity.name} Logo`} className="mx-auto h-24" />
        <h1 className="text-3xl font-bold mt-4">{charity.name}</h1>
        <p className="italic text-lg mt-2">{charity.mission}</p>
      </header>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">About Us</h2>
        <p className="leading-relaxed">{charity.about}</p>
      </section>

      {/* Contact Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-3">Contact</h2>
        <ul className="space-y-2">
          <li><strong>Email:</strong> <a href={`mailto:${charity.contact.email}`} className="text-[#D50032]">{charity.contact.email}</a></li>
          <li><strong>Phone:</strong> {charity.contact.phone}</li>
          <li><strong>Website:</strong> <a href={charity.contact.website} target="_blank" rel="noreferrer" className="text-[#D50032]">{charity.contact.website}</a></li>
        </ul>
      </section>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <button className="bg-[#D50032] text-white px-6 py-2 rounded text-lg">Donate to This Charity</button>
        <button className="bg-[#2C6A4D] text-[#F6A800] px-6 py-2 rounded text-lg">Volunteer</button>
      </div>

      {/* Events Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        {charity.events.length ? (
          charity.events.map((event, index) => (
            <div key={index} className="border p-4 rounded mb-4 shadow-sm">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="italic">{event.date}</p>
              <p className="mt-2">{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events at this time.</p>
        )}
      </section>
    </div>
  );
};

export default CharityDetailPage;
