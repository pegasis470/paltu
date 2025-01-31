'use client';

import React, { Suspense, useEffect, useState } from 'react';
import LoaderComponent from "../../components/LoaderComponent";
import SideDrawer from "../../components/SideDrawer"; 
import { useRouter } from 'next/navigation'; // Import router for redirection
import Cookies from 'js-cookie';





function CaretakerDetails() {
    const [caretaker, setCaretaker] = useState<any | null>(null);
    const router = useRouter(); // Initialize router
    const [message, setMessage] = useState('');
    const [hiddeninfo, sethiddeninfo] = useState('none');
    const id = Cookies.get('caretaker_id')
    const [isMobile, setIsMobile] = useState(false);

    const showinfo= () =>{
        if (hiddeninfo === 'none'){
            sethiddeninfo("block")
        }
        else{
            sethiddeninfo("none")
        }
    }
    const handleLogout = async () => {
        try {
    
          // Send logout request
          const response = await fetch(`http://127.0.0.1:8000/caretaker/logout?id=${id}`, {
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
      router.push("/caretaker/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };
    useEffect(() => {
        const fetchCaretakerDetails = async () => {
            if (!id) {
                setMessage('Caretaker ID is missing in the URL.');
                return;
            }
            const auth_token=Cookies.get('auth_token');
            if (!auth_token) {
                alert('Caretaker authorization Failed: Auth token missing');
                router.push('/caretaker/login ')
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/caretaker/caretaker/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'Online' && data.auth_token === auth_token ) {
                        setCaretaker(data);

                    } else {if(data.auth_token != auth_token){
                        alert('Caretaker authorization Failed: Auth token missing');
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
        };

        fetchCaretakerDetails();
    }, [id]);
    

    if (message) {
        return <p>{message}</p>;
    }

    if (!caretaker) {
        return <LoaderComponent />;
    }

    return (
        <div style={{ 
            display: "flex",
            backgroundColor: "#f69001",
            minHeight: "100vh",
            width: "100%"
          }}>
            <SideDrawer uselight={true} />
            <div style={{
              marginLeft: "5%",
              width: "100%",
              padding: "20px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div style={{marginLeft:"75%"}}><img src="/top-right.png" alt="" width="400"/></div>
              </div>
        
              <div style={{
                textAlign: "center",
                marginTop: "50px"
              }}>
                <h2 style={{ color:"#ffe58c",fontSize: "4rem", margin: "-10px 0",fontFamily:"MoreSugar" }}>Hello</h2>
                <h1 style={{color:"#fff9f2", fontSize: "3.5rem", margin: "1px 0",fontFamily:"LeagueSpartan" }}>HOOOMAN!</h1>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "50px"
              }}>
                {caretaker.animals.map((animal: any, index: number) => (
                  <div key={index} style={{
                    position: "relative",
                    borderRadius: "15px",
                    overflow: "hidden",
                    width: "250px"
                  }}>
                    <h3>Tag ID: {animal.tag_id}</h3>
                    <img 
                      src={animal.photos}
                      alt="Pet" 
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover"
                      }}
                    />
                    <div style={{
                        position: "absolute",
                      bottom: 0,
                      width: "100%",
                      backgroundColor: "#54b1b1",
                      color: "white",
                      padding: "10px",
                      textAlign: "center",
                      display:animal.status? "block":"none",
                    cursor:"pointer"
                    }}
                    onClick={()=>{router.push(`/caretaker/animal?tag_id=${animal.tag_id}`)}}>
                      UPDATE
                    </div>
                  </div>
                ))}
              </div>
        
              <div style={{
                textAlign: "center",
                marginTop: "50px",fontFamily:"MoreSugar"
              }}>
                {caretaker.approved === 'Pending' ? (
                <h3>You have not been approved as a caretaker yet, you can still upload your animals.</h3>
            ) : null}
            {caretaker.approved !== 'BlackListed' ? (
                <a style={{backgroundColor:"white",padding:"0.1%",fontFamily:"Alkarta",marginTop:"1%"}} href={`/caretaker/appeal?id=${id}`}>Post an adoption appeal</a>
            ) : (
                <p>
                    <h3>Sorry, you have been BlackListed</h3>
                    <p>If you think this is a mistake, please feel free to reach out to us.</p>
                </p>
            )}
              </div>
            </div>
          </div>
    );
}

export default function CaretakerPage() {
    return (
        <Suspense fallback={<p>Loading caretaker details...</p>}>
            <CaretakerDetails />
        </Suspense>
    );
}