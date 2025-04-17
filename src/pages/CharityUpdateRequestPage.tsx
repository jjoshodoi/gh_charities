import React, { useState } from 'react';

export default function CharityUpdateRequestPage() {
  const [form, setForm] = useState({
    charityId: '',
    type: 'info',
    payload: '',
  });

  const handleSubmit =  //() => {}
   (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await fetch('http://localhost:3000/update-requests', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // });
    console.log(form)
    
    alert('Update request submitted for review!');
    setForm({ charityId: '', type: 'info', payload: '' });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Request a Charity Update</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2"
          placeholder="Your Charity ID"
          value={form.charityId}
          onChange={(e) => setForm({ ...form, charityId: e.target.value })}
          required
        />
        <select
          className="w-full border px-3 py-2"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="info">Charity Info Update</option>
          <option value="event">Event Update</option>
        </select>
        <textarea
          className="w-full border px-3 py-2"
          placeholder="Paste the new info or event JSON here"
          rows={6}
          value={form.payload}
          onChange={(e) => setForm({ ...form, payload: e.target.value })}
          required
        />
        <button type="submit" className="bg-[#2C6A4D] text-white px-4 py-2 rounded">
          Submit Update Request
        </button>
      </form>
    </div>
  );
}
