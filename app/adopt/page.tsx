'use client';
import React, { useState, useEffect } from 'react';
import '/public/css/paltu.css';
import LoaderComponent from ".././components/LoaderComponent";


export default function AdoptAnimalPage() {
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [avaliableAnimals, setavaliableAnimals] = useState<Animal[][]>([]);
    const [animalDetails, setAnimalDetails] = useState<Animal>({
        age: "",
        type: "",
        gender: "",
        fitness: true,
        sterilisation: true,
        vaccination: true,
        caretaker_id: 0,
        avaliable: false,
        photos: "",
        tag_id: "",
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
        caretaker_id: number;
        avaliable: boolean;
        photos: string;
        tag_id: string;
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
                const response = await fetch('https://adoption-backed.vercel.app/animals/animals/', {
                    headers: { 'ngrok-skip-browser-warning': '1' },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
    
                // Map API response to match Animal interface
                const animals = data.map((item: Animal) => ({
                    age: String(item.age), // Ensure age is a string
                    type: item.animal_type, // Map `animal_type` to `type`
                    gender: item.gender,
                    fitness: item.fitness,
                    sterilisation: item.sterilisation,
                    vaccination: item.vaccination,
                    caretaker_id: item.caretaker_id,
                    avaliable: item.avaliable, // Fix typo: -> avaliable
                    photos: item.photos,
                    tag_id: item.tag_id,
                    animal_type: item.animal_type,
                }));
    
                // Filter animals
                const filteredAnimals = animals.filter((animal: Animal) => animal.avaliable);
    
                // Group animals based on device type
                const groupedAnimals = isMobile
                    ? filteredAnimals.map((animal: Animal) => [animal]) // Each animal in its own group for mobile
                    : filteredAnimals.reduce((result: Animal[][], animal: Animal, index: number) => {
                          if (index % 4 === 0) result.push([]);
                          result[Math.floor(index / 4)].push(animal);
                          return result;
                      }, []);
    
                setavaliableAnimals(groupedAnimals);
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
    



    // Rest of your existing functions
    const Scroll = () => {
        const windowHeight = document.documentElement.scrollHeight;
        window.scrollTo({
            top: windowHeight * 10,
            behavior: 'smooth'
        });
    };

    const fetchAnimalsByID = async (tag_id: string) => {
        try {
            const response = await fetch(`https://adoption-backed.vercel.app/animals/animals/${tag_id}`);
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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % avaliableAnimals.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + avaliableAnimals.length) % avaliableAnimals.length);
    };

    return (
        <>
            {loading ? (
                <LoaderComponent />
            ) : (
                <>
                    <div className='header'>
                        <img height={"120"} style={{ marginLeft: "93%", marginTop:"2%" }} src="/images/paltu logo.png" alt="" />
                    </div>
                    <div id="main">
                        <h1>Have a look at our Cuties....</h1>
                        {avaliableAnimals.length > 0 ? (
                            <div className="carousel-container">
                                <button className="carousel-button left" onClick={prevSlide}>
                                    ❮
                                </button>
                                <button className="carousel-button right" onClick={nextSlide}>
                                    ❯
                                </button>
                                <div id="carousel-slides">
                                    {avaliableAnimals[currentIndex].map((animal, index) => (
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
                            <p>No animals at the moment.</p>
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
                                    <p>Type: {animalDetails.animal_type}</p>
                                    <p>Gender: {animalDetails.gender}</p>
                                    <p>Fitness: {animalDetails.fitness}</p>
                                    <p>Sterilisation: {animalDetails.sterilisation ? "yes" : "no"}</p>
                                    <p>Vaccination: {animalDetails.vaccination ? "yes" : "no"}</p>
                                    <p>Caretaker ID : {animalDetails.caretaker_id}</p>
                                </div>
                            </div>
                            <button
                                className="adopt-button"
                                onClick={() =>
                                    (window.location.href = `/adoptionform?tag_id=${animalDetails.tag_id}`)
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