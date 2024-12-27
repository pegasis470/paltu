'use client';
import React, { useState, useEffect } from 'react';
import '/public/css/paltu.css';

export default function AdoptAnimalPage() {
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [availableAnimals, setAvailableAnimals] = useState<Animal[][]>([]);
    const [animalDetails, setAnimalDetails] = useState<Animal>({
        age: "",
        type: "",
        gender: "",
        fitness: true,
        sterilisation: true,
        vaccination: true,
        caretaker: "",
        avaliable: false,
        photos: "",
        tag_id: 0,
        animal_type: ""
    });
    const [detailsFound, setDetailsFound] = useState(false);

    // Define the Animal interface
    interface Animal {
        age: string;
        type: string;
        gender: string;
        fitness: boolean;
        sterilisation: boolean;
        vaccination: boolean;
        caretaker: string;
        avaliable: boolean;
        photos: string;
        tag_id: number;
        animal_type: string;
    }

    // Detect mobile view and handle resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch all animals
    useEffect(() => {
        const fetchAnimals = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://dae1-2401-4900-51c5-bdb8-eb1b-86c3-8ba8-8e66.ngrok-free.app/animals/animals/');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const filteredAnimals = data.filter((animal: Animal) => animal.avaliable);

                // Group animals based on device type
                const groupedAnimals = isMobile
                    ? filteredAnimals.map((animal: Animal) => [animal])
                    : filteredAnimals.reduce((result: Animal[][], animal: Animal, index: number) => {
                          if (index % 4 === 0) result.push([]);
                          result[Math.floor(index / 4)].push(animal);
                          return result;
                      }, []);

                setAvailableAnimals(groupedAnimals);
            } catch (error) {
                console.error('Error fetching animals:', error);
            } finally {
                // Add a slight delay to ensure loader video plays
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        fetchAnimals();
    }, [isMobile]);

    // Loader component with device-specific video
    const LoaderComponent = () => (
        <div id="loader">
            {isMobile ? (
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    id="bg-video"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                >
                    <source src="/images/bg-mobile.mp4" type="video/mp4" />
                    <img src="/images/BG-mobile.png" alt="Mobile Background" />
                </video>
            ) : (
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    id="bg-video"
                >
                    <source src="/images/bg.mp4" type="video/mp4" />
                    <img src="/images/BG.png" alt="Desktop Background" />
                </video>
            )}
        </div>
    );

    // Rest of your existing functions
    const Scroll = () => {
        const windowHeight = document.documentElement.scrollHeight;
        window.scrollTo({
            top: windowHeight * 0.5,
            behavior: 'smooth'
        });
    };

    const fetchAnimalsByID = async (tag_id: number) => {
        try {
            const response = await fetch(`https://dae1-2401-4900-51c5-bdb8-eb1b-86c3-8ba8-8e66.ngrok-free.app/animals/animals/${tag_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAnimalDetails(data);
            setDetailsFound(true);
        } catch (error) {
            console.error('Error fetching animal details:', error);
        }
        Scroll();
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % availableAnimals.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + availableAnimals.length) % availableAnimals.length);
    };

    return (
        <>
            {loading ? (
                <LoaderComponent />
            ) : (
                <>
                    <div className='header'>
                        <img height={"120"} style={{ marginLeft: "95%" }} src="/images/paltu logo.png" alt="" />
                    </div>
                    <div id="main">
                        <h1>Have a look at our Cuties....</h1>
                        {availableAnimals.length > 0 ? (
                            <div className="carousel-container">
                                <button className="carousel-button left" onClick={prevSlide}>
                                    ❮
                                </button>
                                <button className="carousel-button right" onClick={nextSlide}>
                                    ❯
                                </button>
                                <div id="carousel-slides">
                                    {availableAnimals[currentIndex].map((animal, index) => (
                                        <div
                                            key={index}
                                            className="carousel-slide"
                                            style={{
                                                width: "100%",
                                                backgroundImage: `url('${animal.photos}')`
                                            }}
                                        >
                                            <div className="carousel-overlay">
                                                <h2>Tag ID: {animal.tag_id}</h2>
                                                <p>Type: {animal.animal_type}</p>
                                                <button
                                                    className="details-button"
                                                    onClick={() => fetchAnimalsByID(animal.tag_id)}
                                                >
                                                    Get Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No available animals at the moment.</p>
                        )}
                    </div>
                    {detailsFound && (
                        <>
                            <div className="animal-details-container">
                                <img
                                    src={`${animalDetails.photos}`}
                                    alt="Animal"
                                    className="animal-image"
                                />
                                <div className="animal-overlay">
                                    <h2>Tag ID: {animalDetails.tag_id}</h2>
                                    <p>Age: {animalDetails.age}</p>
                                    <p>Type: {animalDetails.type}</p>
                                    <p>Gender: {animalDetails.gender}</p>
                                    <p>Fitness: {animalDetails.fitness}</p>
                                    <p>Sterilisation: {animalDetails.sterilisation ? "yes" : "no"}</p>
                                    <p>Vaccination: {animalDetails.vaccination ? "yes" : "no"}</p>
                                    <p>Caretaker: {animalDetails.caretaker}</p>
                                </div>
                            </div>
                            <button
                                className="adopt-button"
                                onClick={() =>
                                    (window.location.href = `/paltu/adoptionform?tag_id=${animalDetails.tag_id}`)
                                }
                            >
                                Adopt now
                            </button>
                        </>
                    )}
                </>
            )}
        </>
    );
}