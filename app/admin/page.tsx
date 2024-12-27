"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Application {
  id: number;
  name: string;
  occupation: string;
  animal_id: number;
  contact: string;
  whatsapp: string;
  address: string;
  email: string | null;
  adopter_image: string;
  adopter_doc: string;
  status: string;
  incamp: boolean;
}

export default function AdminPage() {
  const [message, setMessage] = useState<string>("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    councler_name: "",
    plans: "",
    pets: "",
    alone: "",
    temp_caretaker: "",
  });
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const username = queryParams.get("username");
        if (!username) {
          setMessage("Incorrect link username is invalid");
          return;
        }
        setFormData({ ...formData, councler_name: username })
        const response = await fetch(`https://adoption-backed.vercel.app/users/users/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const userData = await response.json();
  
        if (userData.status === "Online") {
          const applicationsResponse = await fetch("https://adoption-backed.vercel.app/applications/applications/");
          if (!applicationsResponse.ok) {
            throw new Error("Failed to fetch applications");
          }
  
          const applicationsData = await applicationsResponse.json();
  
          // Filter applications to show only those with status "Pending"
          const pendingApplications = applicationsData.filter(
            (application: { status: string }) => application.status === "Pending"
          );
          setApplications(pendingApplications);
        } else {
          setMessage("You are not logged in, please contact IT dept to give you access.Or go to the login page and try agian");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("You are not logged in, please contact IT dept to give you access.Or go to the login page and try agian");
      }
    };
  
    checkUserStatus();
  }, []);
  

  const fetchApplicationDetails = async (applicationId: number) => {
    try {
      const response = await fetch(`https://adoption-backed.vercel.app/applications/applications/${applicationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch application details");
      }
      const data = await response.json();
      setSelectedApplication(data);
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };

  const handleFormApprove = async () => {
    if (!selectedApplication) {
      alert("No application selected!");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/form/approve?application_id=${selectedApplication.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form submitted successfully!");
      setFormData({...formData, plans: "", pets: "", alone: "", temp_caretaker: "" }); // Reset form
      setSelectedApplication(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form data");
    }
  };
  const handleFormDecline = async () => {
    if (!selectedApplication) {
      alert("No application selected!");
      return;
    }

    try {
      const response = await fetch(
        `https://adoption-backed.vercel.app/form/decline?application_id=${selectedApplication.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form submitted successfully!");
      setFormData({...formData, plans: "", pets: "", alone: "", temp_caretaker: "" }); // Reset form
      setSelectedApplication(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form data");
    }
  };
  const router = useRouter();
  const handleLogout = async () => {
    try {
      // Get the username from the URL query parameter
      const queryParams = new URLSearchParams(window.location.search);
      const username = queryParams.get("username");

      if (!username) {
        alert("Username not provided in the URL.");
        return;
      }

      // Send logout request
      const response = await fetch(`https://adoption-backed.vercel.app/users/users/logout?user=${username}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log out.");
      }

      // Redirect to the login page after successful logout
      alert("You have been logged out successfully.");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {message ? (
        <p>{message}</p>
      ) : (
        <div >
          <div style={{display:"flex"}}>
          <h1>Applications</h1>
          <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ff6347",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px"  
          ,marginLeft:"80%"
        }}
      >
        Logout
      </button>
      </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => fetchApplicationDetails(app.id)}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  width: "200px",
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3>{app.name}</h3>
                <p>Occupation: {app.occupation}</p>
                <p>Status: {app.status}</p>
              </div>
            ))}
          </div>

          {selectedApplication && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#eef",
              }}
            >
              <h2>Application Details</h2>
              <h3 style={{backgroundColor:"black",color:"white",padding:"10px"}}>Adopter ID: {selectedApplication.id}</h3>
              <p><strong>Name:</strong> {selectedApplication.name}</p>
              <p><strong>Occupation:</strong> {selectedApplication.occupation}</p>
              <p><strong>Animal ID:</strong> {selectedApplication.animal_id}</p>
              <p><strong>Contact:</strong> {selectedApplication.contact}</p>
              <p><strong>WhatsApp:</strong> {selectedApplication.whatsapp}</p>
              <p><strong>Address:</strong> {selectedApplication.address}</p>
              <p><strong>Email:</strong> {selectedApplication.email || "N/A"}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
              <p><strong>Present in camp: {selectedApplication.incamp}</strong></p>
              <div style={{display:"flex"}}>
              <p style={{width:"50%"}}><strong>Adopter Image:</strong></p>
              <p><strong>Adopter Document:</strong></p>
              </div>
              <div style={{display:"flex"}}>
              <img
                src={selectedApplication.adopter_image}
                alt="Adopter"
                style={{ maxWidth: "100%", borderRadius: "8px", width:"50%" }}
              />
              <img
                src={selectedApplication.adopter_doc}
                alt="Adopter Document"
                style={{ maxWidth: "100%", borderRadius: "8px",width:"50%" }}
              />
              </div>
              {/* Additional Form */}
              <h3>Additional Information</h3>
              <div>
                <label>Plans:</label>
                <input
                  type="text"
                  value={formData.plans}
                  onChange={(e) => setFormData({ ...formData, plans: e.target.value })}
                  style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />
                <label>Pets:</label>
                <input
                  type="text"
                  value={formData.pets}
                  onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                  style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />
                <label>Alone:</label>
                <input
                  type="text"
                  value={formData.alone}
                  onChange={(e) => setFormData({ ...formData, alone: e.target.value })}
                  style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />
                <label>Temporary Caretaker:</label>
                <input
                  type="text"
                  value={formData.temp_caretaker}
                  onChange={(e) => setFormData({ ...formData, temp_caretaker: e.target.value })}
                  style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />
                <button onClick={handleFormApprove} style={{backgroundColor:"green",color:"white",fontWeight:"bolder",padding:"5px", marginTop: "10px" }}>
                  Approve
                </button>
                <button onClick={handleFormDecline} style={{backgroundColor:"red",color:"white",fontWeight:"bolder",padding:"5px", marginTop: "10px", marginLeft:"10px" }}>
                  Decline
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
