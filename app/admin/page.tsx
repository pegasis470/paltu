"use client";
import React, { useState, useEffect } from 'react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('https://adoption-backed.vercel.app/applications/applications/');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  // Fetch application details by ID
  const fetchApplicationDetails = async (applicationId : number) => {
    try {
      const response = await fetch(`https://adoption-backed.vercel.app/applications/applications/${applicationId}`);
      const data = await response.json();
      setSelectedApplication(data);
    } catch (error) {
      console.error('Error fetching application details:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Applications</h1>

      {/* Display all applications */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {applications.map((app) => (
          <div
            key={app.id}
            onClick={() => fetchApplicationDetails(app.id)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '200px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3>{app.name}</h3>
            <p>Occupation: {app.occupation}</p>
            <p>Status: {app.status}</p>
          </div>
        ))}
      </div>

      {/* Display selected application details */}
      {selectedApplication && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#eef',
          }}
        >
          <h2>Application Details</h2>
          <p><strong>Name:</strong> {selectedApplication.name}</p>
          <p><strong>Occupation:</strong> {selectedApplication.occupation}</p>
          <p><strong>Tag ID:</strong> {selectedApplication.tag_id}</p>
          <p><strong>Status:</strong> {selectedApplication.status}</p>
          <p><strong>Adopter Image</strong></p>
          <img src={selectedApplication.adopter_image}/>
          <p><strong>Adopter ID</strong></p>
          <img src={selectedApplication.adopter_doc}/>
        </div>
      )}
    </div>
  );
}
