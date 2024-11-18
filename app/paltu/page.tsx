'use client';
import React, { useState, useEffect } from 'react';
import '/public/css/paltu.css';

export default function AdoptAnimalPage() {
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [availableAnimals, setAvailableAnimals] =  useState<Animal[]>([]);
    const [animalDetails, setAnimalDetails] = useState<Animal>({
        avaliable: false,
        photos: "",
        tag_id: 0,
        animal_type: ""
      });
    const [detailsfound,setDetailsFound]=useState(false);
    // Fetch all animals
    interface Animal{
        avaliable: boolean;
        photos: string;
        tag_id: number;
        animal_type: string;
    }
    useEffect(() => {
            const fetchAnimals = async () => {
                setLoading(true);
                try {
                    const response = await fetch('https://adoption-management.vercel.app/animals/animals/');
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    const filteredAnimals = data.filter((animal: Animal) => animal.avaliable);
                    setAvailableAnimals(filteredAnimals);
                } catch (error) {
                    console.error('Error fetching animals:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAnimals();
        }, []);

        // Fetch animal details by ID
        const fetchAnimalsByID = async (tag_id: number) => {
            try {
                const response = await fetch(`https://adoption-management.vercel.app/animals/animals/${tag_id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setAnimalDetails(data);
                setDetailsFound(true);
            } catch (error) {
                console.error('Error fetching animal details:', error);
            }
        };

        // Display the next slide
        const nextSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % availableAnimals.length);
        };

        // Display the previous slide
        const prevSlide = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + availableAnimals.length) % availableAnimals.length);
        };

        return (
            <div>
                {loading && (
                    <div id="loader">
                        <video autoPlay muted loop playsInline id="bg-video">
                            <source src="./images/bg.mp4" type="video/mp4" />
                            <img src="BG.png" alt="Background" />
                        </video>
                    </div>
                )}
                {!loading && (
                    <div id="main">
                        <h1>Available Animals</h1>
                        {availableAnimals.length > 0 ? (
                            <div className="carousel-container">
                                <button className="carousel-button left" onClick={prevSlide}>
                                    ❮
                                </button>
                                <button className="carousel-button right" onClick={nextSlide}>
                                    ❯
                                </button>
                                <div id="carousel-slides">
                                    <div
                                        className="carousel-slide"
                                        style={{
                                            backgroundImage: `url('./images/photos/${availableAnimals[currentIndex]?.photos}')`,
                                        }}
                                    >
                                        <div className="carousel-overlay">
                                            <h2>Tag ID: {availableAnimals[currentIndex]?.tag_id}</h2>
                                            <p>Type: {availableAnimals[currentIndex]?.animal_type}</p>
                                            <button
                                                className="adopt-button"
                                                onClick={() => fetchAnimalsByID(availableAnimals[currentIndex]?.tag_id)}
                                            >
                                                Adopt Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No available animals at the moment.</p>
                        )}
                        {detailsfound && (
                <div id="animal-details" style={{ zIndex: "99",marginTop: 850, textAlign: 'center', position: 'relative'}}>
                    <h2>Tag ID: {animalDetails.tag_id}</h2>
                    <img
                        src={`./images/photos/${animalDetails.photos}`}
                        width="800px"
                        style={{ borderRadius: '10px' }}
                    />
                            </div>
                        )}
                    </div>

                )}

            </div>
        );
    };
