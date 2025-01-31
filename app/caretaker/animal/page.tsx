'use client';

import React, {Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoaderComponent from "../../components/LoaderComponent";
import { useRouter } from 'next/navigation'; // Import router for redirection
import Cookies from 'js-cookie';
import SideDrawer from "../../components/SideDrawer"; 



function AnimalDashboard() {
    const [animalData, setAnimalData] = useState<any | null>(null);
    const router = useRouter(); // Initialize router
    const [formData, setFormData] = useState({
        age: 0,
        fitness: '',
        vaccination: false,
        sterilisation: false,
        avaliable: false
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const tagId = searchParams.get('tag_id'); // Fetch tag ID from the URL

    // Fetch animal details
    useEffect(() => {
        const fetchAnimalDetails = async () => {
            if (!tagId) {
                setMessage('Animal tag ID is missing in the URL.');
                setLoading(false);
                return;
            }
            const auth_token=Cookies.get('auth_token');
            if (!auth_token) {
                alert('Caretaker authorization Failed: Auth token missing');
                router.push('/caretaker/login ')
                return;
            }
            try {
                const response = await fetch(`https://adoption-backed.vercel.app/animals/animals/${tagId}`);
                if (response.ok) {
                    const animal = await response.json();
                    try {
                        const response = await fetch(`https://adoption-backed.vercel.app/caretaker/caretaker/${animal.caretaker_id}`);
                        if (response.ok) {
                            const data = await response.json();
                            if (data.status === 'Online' && data.auth_token === auth_token ) {
                                setAnimalData(animal);
                                setFormData({
                                    age: animal.age,
                                    fitness: animal.fitness,
                                    vaccination: animal.vaccination,
                                    sterilisation: animal.sterilisation,
                                    avaliable: animal.avaliable
                                });
        
                            } else {if(data.auth_token != auth_token){
                                alert('Caretaker authorization Failed: Login bypass detected, initiating security protocols');
                                router.push('/caretaker/login ')
                                return;
                            }
                                setMessage('Caretaker is not online.');
                            }
                        } else {
                            setMessage('Failed to fetch caretaker details.');
                        }
                    } catch (error) {
                        console.error('Error fetching caretaker details:', error);
                        setMessage('An error occurred while fetching caretaker details.');
                    }
                } else {
                    setMessage('Failed to fetch animal details.');
                }
            } catch (error) {
                console.error('Error fetching animal details:', error);
                setMessage('An error occurred while fetching animal details.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalDetails();
    }, [tagId]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value } = target;
        const isCheckbox = target.type === 'checkbox';

        setFormData({
            ...formData,
            [name]: isCheckbox ? (target as HTMLInputElement).checked : value,
        });
    };
    const removeAnimal = () =>{
        alert("This action cannot be undone !! ");
        setFormData({...formData, avaliable : false })
    }
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch(`https://adoption-backed.vercel.app/animals/animals/${tagId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Animal details updated successfully!');
                router.push(`/caretaker/dashboard?id=${animalData.caretaker_id}`)
            } else {
                setMessage('Failed to update animal details.');
            }
        } catch (error) {
            console.error('Error updating animal details:', error);
            setMessage('An error occurred while updating animal details.');
        }
    };

    if (loading) {
        return <LoaderComponent />;
    }

    if (!animalData) {
        return <p>{message}</p>;
    }

    return (
        <>
        <div style={{ 
  display: "flex",
  backgroundColor: "#f69001",
  minHeight: "100vh",
  width: "100%",
}}>
  <SideDrawer uselight={true} />
  <div style={{
    marginLeft: "20%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem"
  }}>
    <h1 style={{ textAlign: "center", color: "white" }}>Animal Dashboard</h1>
    <img 
      src={animalData.photos}
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        margin: "2rem auto"
      }}
    />
    <div style={{
      backgroundColor: "white",
      fontFamily: "MoreSugarThin",
      padding: "10%",
      width: "100%",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>Tag ID: {tagId}</h2>
      <form 
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        <label style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "1rem"
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
              marginLeft: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </label>

        <label style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "1rem"
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
              marginLeft: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </label>

        <label style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "1rem"
        }}>
          Vaccination:
          <input
            type="checkbox"
            name="vaccination"
            checked={formData.vaccination}
            onChange={handleInputChange}
            style={{ marginLeft: "1rem" }}
          />
        </label>

        <label style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "1rem"
        }}>
          Sterilisation:
          <input
            type="checkbox"
            name="sterilisation"
            checked={formData.sterilisation}
            onChange={handleInputChange}
            style={{ marginLeft: "1rem" }}
          />
        </label>

        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          width: "100%",
          marginTop: "1rem"
        }}>
          <button 
            type="submit" 
            style={{
              padding: '10px 20px',
              backgroundColor: "#f69001",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Update Details
          </button>
          <button 
            onClick={removeAnimal}
            style={{
              padding: '10px 20px',
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Remove Animal Entry
          </button>
        </div>
      </form>
    </div>
  </div>
</div>       
        </>
    );
}
export default function AnimalPage() {
    return (
        <Suspense fallback={<p>Loading caretaker details...</p>}>
            <AnimalDashboard />
        </Suspense>
    );
}

