'use client';
import React, { useEffect, useState } from "react";
import "/public/css/AdoptionForm.css";

const AdoptionForm = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const applicationId = searchParams.get("application_id");

      try {
        const response = await fetch(`http://127.0.0.1:8000/form/form?application_id=${applicationId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching form data:", error);
        alert("Failed to load form data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const printPage = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error-container">
        <div className="error-text">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="container">
        <img src="/images/AWH-logo.png" width={"200"}/>
      <h1>Adoption Form</h1>

    </div>
  );
};

export default AdoptionForm;
