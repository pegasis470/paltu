'use client';
import { useRouter } from "next/navigation";
import '/public/css/paltu.css';
import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import LoaderComponent from "../../components/LoaderComponent";
import SideDrawer from "@/app/components/SideDrawer";

export default function AppealsPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        gender: 'Not sure',
        vaccination: true,
        fitness: '',
        sterilisation: true,
        animal_type: '',
        age: '',
    });
    const [animalImage, setAnimalImage] = useState<File | null>(null);
    const [caretakerId, setCaretakerId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [message, setMessage] = useState('');

    // Retrieve the ID from the URL
        useEffect(() => {
            const queryParams = new URLSearchParams(window.location.search);
            const id = queryParams.get('id');
            if (id) {
                setCaretakerId(Number(id));
            } else {
                setMessage('Caretaker ID not found in URL.');
            }
        }, []);
    
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            setFormData({
                ...formData,
                [name]: type === 'select-one' && (name === 'vaccination' || name === 'sterilisation') 
                    ? value === 'true' // Convert string 'true'/'false' to boolean
                    : value,
            });
        };
        
    
        const handleFileChange  = async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0]; // Get the selected file
            if (file) {
                const options = {
                    maxSizeMB: 1,       // Maximum size in MB
                    maxWidthOrHeight: 1600, // Max width or height
                    useWebWorker: true,    // Use Web Worker for better performance
                };
        
                try {
                    const compressedFile = await imageCompression(file, options);
                    console.log('Original File Size:', file.size/1000000 , 'MB');
                    console.log('Compressed File Size:', compressedFile.size/1000000 , 'MB');
                    setAnimalImage(compressedFile);
                } catch (error) {
                    console.error('Image compression error:', error);
                }
            }
                }
        
            };
    
        const handleSubmit = async (e: React.FormEvent) => {
            setLoading(true);
            e.preventDefault();
    
            if (!caretakerId) {
                setMessage('Caretaker ID is required to register an animal.');
                return;
            }
    
            const formPayload = new FormData();
            formPayload.append('id', String(caretakerId));
            Object.entries(formData).forEach(([key, value]) => {
                formPayload.append(key, value.toString());
            });
            if (animalImage) {
                formPayload.append('animal', animalImage);
            } else {
                setMessage('Please upload an animal image.');
                return;
            }
    
            try {
                const response = await fetch('http://127.0.0.1:8000/animals/animals/', {
                    method: 'POST',
                    body: formPayload,
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setMessage(`Animal registered successfully! Animal Tag: ${data.id}`);
                    router.push(`/caretaker/dashboard?id=${caretakerId}`)
                } else {
                    const errorData = await response.json();
                    setMessage(`Failed to register animal: ${errorData.detail || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error registering animal:', error);
                setMessage('An error occurred while registering the animal.');
             }
        };

    return (
        <div style={{ 
            display: "flex",
            backgroundColor: "#f69001",
            minHeight: "100vh",
            width: "100%",
            justifyContent: "center"
        }}>
            {loading ? (
                <LoaderComponent />
            ) : (
              <div style={{
              width: "90%",
              maxWidth: "800px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h1 style={{
                color: "white",
                textAlign: "center",
                marginBottom: "2rem",
                fontSize: "2.5rem"
              }}>Register Animal</h1>

              {message && <p style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
                width: "100%",
                textAlign: "center"
              }}>{message}</p>}

              {caretakerId ? (
                <div style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  width: "100%",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}>
                  <form onSubmit={handleSubmit} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                  }}>
                    <label style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      Gender:
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "60%"
                        }}
                      >
                        <option value="Not sure">Not sure</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </label>

                    <label style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      Fitness:
                      <input
                        type="text"
                        name="fitness"
                        value={formData.fitness}
                        onChange={handleInputChange}
                        required
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "60%"
                        }} />
                    </label>

                    <label style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      Vaccination:
                      <select
                        name="vaccination"
                        value={formData.vaccination ? 'true' : 'false'}
                        onChange={handleInputChange}
                        required
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "60%"
                        }}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </label>

                    <label style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      Sterilisation:
                      <select
                        name="sterilisation"
                        value={formData.sterilisation ? 'true' : 'false'}
                        onChange={handleInputChange}
                        required
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "60%"
                        }}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </label>

                    <label style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      Animal Type:
                      <input
                        type="text"
                        name="animal_type"
                        value={formData.animal_type}
                        onChange={handleInputChange}
                        required
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "60%"
                        }} />
                    </label>

                    <label style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      Age:
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          width: "60%"
                        }} />
                    </label>

                    <label style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      Animal Image:
                      <input
                        type="file"
                        name="animal"
                        onChange={handleFileChange}
                        required
                        style={{
                          width: "60%"
                        }} />
                    </label>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#f69001",
                        color: "white",
                        padding: "12px 24px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        marginTop: "1rem",
                        width: "100%",
                        transition: "background-color 0.2s"
                      }}
                    >
                      Register Animal
                    </button>
                  </form>
                </div>
              ) : (
                <p style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "100%"
                }}>Loading caretaker information...</p>
              )}
            </div>
            )}
        </div>
    );
}