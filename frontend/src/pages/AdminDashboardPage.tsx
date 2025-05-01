import React, { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/update-requests')
      .then(res => res.json())
      .then(setRequests);
  }, []);

  const handleAction = async () => {} //(id, action) => {
//     await fetch(`http://localhost:3000/update-requests/${id}/${action}`, { method: 'PATCH' });
//     setRequests((prev) => prev.filter((r) => r.id !== id));
//   };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl mb-2">Pending Charity Update Requests</h2>
      {requests.map((r) => (
        <div key={r} className="border p-4 mb-3">
          {/* <p><strong>Charity ID:</strong>{r.charityId}</p>
          <p><strong>Type:</strong> {r.type}</p> */}
          <p><strong>Charity ID:</strong> charity id</p>
          <p><strong>Type:</strong> type</p>
          {/* <pre className="bg-gray-100 p-2">{JSON.stringify(r.payload, null, 2)}</pre> */}
          <pre className="bg-gray-100 p-2"></pre>
          <div className="mt-2">
            <button onClick={() => {}} className="mr-3 text-green-600">Approve</button>
            <button onClick={() => {}} className="text-red-600">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
