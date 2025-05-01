import * as React from 'react';
import { Link } from 'react-router-dom';
// import testPic from '../assets/testpic1.jpg';

export default function HomePage() {
    return (
        <div className="bg-white text-[#2C6A4D] font-serif">
      {/* Header */}
      <header className="text-center py-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold">UK Ghana Charities</h1>
        <Link
                to={`/admin`}
              >
                <button className="px-4 py-2 rounded">Admin</button>
              </Link>

              <Link to={`/charities/1/update`}>
                <button className=" px-4 py-2 rounded">Charity Update Req</button>
              </Link>
      </header>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[400px]" style={{ backgroundImage:  `url(/assets/testpic1.jpg)` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-4xl font-bold">Connecting UK Ghana Charities for Greater Impact</h2>
          <p className="mt-2 text-lg">Support. Collaborate. Grow.</p>
          <div className="mt-4 space-x-4">
          <Link
                to={`/charities`}
                // className="inline-block bg-[#2C6A4D] text-[#F6A800] px-4 py-2 rounded"
              >
                <button className="bg-[#2C6A4D] text-[#F6A800] px-4 py-2 rounded">Explore Directory</button>
              </Link>
            <button className="bg-[#D50032] text-white px-4 py-2 rounded">Donate Now</button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-green-50 py-12 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div>
            <h3 className="text-xl font-bold">Connect</h3>
            <p>Facilitate partnerships between UK and Ghanaian charities</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Support</h3>
            <p>Increase visibility & funding for charities</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Grow</h3>
            <p>Promote outreach through collaboration</p>
          </div>
        </div>
      </section>

      {/* Featured Charities */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Featured Charities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {['Ghana Health Foundation', 'Education for Ghana', 'Community Support UK'].map((name, i) => (
            <div key={i} className="border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">{name}</h3>
              <p className="text-sm">Short description of the charity and its goals.</p>
              <div className="mt-4 flex justify-center gap-2">
                <button className="bg-[#2C6A4D] text-[#F6A800] px-3 py-1 rounded">Donate</button>
                <button className="border border-[#2C6A4D] text-[#2C6A4D] px-3 py-1 rounded">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News & Events */}
      <section className="bg-white py-12">
        <h2 className="text-2xl font-bold text-center mb-6">News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
          <div className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">Charity Gala in London</h3>
            <p className="italic">10 June 2024</p>
            <p className="mt-2">Join us for a special charity event to raise funds for Ghanaian causes.</p>
            <button className="mt-3 bg-[#D50032] text-white px-4 py-1 rounded">Donate</button>
          </div>
          <div className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">Volunteer Opportunities</h3>
            <p className="italic">1 June 2024</p>
            <p className="mt-2">Discover ways to contribute your time and skills.</p>
            <button className="mt-3 bg-[#D50032] text-white px-4 py-1 rounded">Read More</button>
          </div>
        </div>
        <div className="mt-10 text-center italic text-lg">
          “Join us for a special charity event!<br />Stay updated with the latest charity news.”
        </div>
      </section>

      {/* Get Involved */}
      <section className="bg-[#2C6A4D] text-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Get Involved</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4 px-4">
          <button className="bg-transparent border border-white px-6 py-2 rounded">Volunteer</button>
          <button className="bg-transparent border border-white px-6 py-2 rounded">Ways to Donate</button>
          <button className="bg-transparent border border-white px-6 py-2 rounded">Partner With Us</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C6A4D] text-white text-center py-4">
        <p>&copy; 2025 UK Ghana Charities. All rights reserved.</p>
      </footer>
    </div>
    );
}
