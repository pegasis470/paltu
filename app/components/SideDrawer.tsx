"use client";
import React, { useState, useEffect, useRef,CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


interface Caretaker {
  caretaker_image?: string;
  name?: string;
  status?: string;
  auth_token?: string;
}



const styles: { [key: string]: CSSProperties } = {
  toggleButton: {
    position: "fixed",
    top: "0.2rem",
    left: "1rem",
    zIndex: 0,
    padding: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer"
  },
  drawer: {
    position: "relative",
    top: 0,
    left: 0,
    minHeight: "100%",
    maxWidth: "80%",
    backgroundColor: "#f69001",
    transition: "transform 0.3s ease-in-out",
    overflowY: "auto",
    zIndex: 40
  },
  drawerHidden: {
    transform: "translateX(-100%)",
    width:"7%",
  },
  drawerVisible: {
    width:"40%",
    transform: "translateX(0)"
  },
  drawerHiddenMobile: {
    transform: "translateX(-100%)",
    width:"0%",
    minWidth:"0%"
  },
  drawerVisibleMobile: {
    width:"100%",
    transform: "translateX(0)",
    minWidth:"90%"
  },
  profileSection: {
    position: "relative",
    height: "30%",
    backgroundColor: "#f5f5f5",
    alignItems:"center"
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  profileInfo: {
    position: "absolute",
    bottom: "1rem",
    left: "0.4rem",
    color: "white",
    textAlign:"right",
    width:"90%"
  },
  profileName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    textAlign:"right",
    color:"#ffffff",
    marginTop:"-50%"
  },
  menuContainer: {
    display:"block",
    padding: "1rem",
    marginTop:"7%"
  },
  menuButton: {
    display:"block",
    width:"99%",
    textAlign:"center",
    padding: "0.75rem",
    marginBottom: "0.5rem",
    backgroundColor: "white",
    border: "none",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
    color: "#333",
    fontFamily:"MoreSugar"
  },
  loginSection: {
    padding: "0rem",
    textAlign: "center",
    },
  loginButton: {
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    padding: "0.75rem 2rem",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem"
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "0.75rem",
    width: "100%",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem"
  },
  logo: {
    width: "8%",
    margin: "2rem auto",
    display: "block"
  }
};

export default function SideDrawer({uselight=false}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [caretaker, setCaretaker] = useState<Caretaker | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const id = Cookies.get("caretaker_id");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth_token = Cookies.get("auth_token");
    const caretaker_id = Cookies.get("caretaker_id");
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    if (auth_token && caretaker_id) {
      setIsLoggedIn(true);
      fetchCaretakerDetails(caretaker_id, auth_token);
    }
  }, []);

  const fetchCaretakerDetails = async (id: string, auth_token: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/caretaker/caretaker/${id}`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch caretaker details.");
        return;
      }

      const data = await response.json();

      if (data.status === "Online" && data.auth_token === auth_token) {
        setCaretaker(data);
      } else {
        alert("Caretaker authorization failed!");
        Cookies.remove("auth_token");
        Cookies.remove("caretaker_id");
        router.push("/caretaker/login");
      }
    } catch (error) {
      console.error("Error fetching caretaker details:", error);
      setMessage("An error occurred while fetching caretaker details.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/caretaker/logout?id=${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log out.");
      }

      alert("You have been logged out successfully.");
      Cookies.remove("auth_token");
      Cookies.remove("caretaker_id");
      setIsLoggedIn(false);
      setCaretaker(null);
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    "Pet Guide",
    "First Aid Info",
    "Emergency Contacts",
    "FAQs",
    "Help"
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={styles.toggleButton}
      >
       <svg fill={uselight? "white":"#f69001"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  width="70px" height="70px" viewBox="0 0 342.382 342.382" >
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M45.225,125.972C20.284,125.972,0,146.256,0,171.191c0,24.94,20.284,45.219,45.225,45.219 c24.926,0,45.219-20.278,45.219-45.219C90.444,146.256,70.151,125.972,45.225,125.972z"/> </g> <g> <path d="M173.409,125.972c-24.938,0-45.225,20.284-45.225,45.219c0,24.94,20.287,45.219,45.225,45.219 c24.936,0,45.226-20.278,45.226-45.219C218.635,146.256,198.345,125.972,173.409,125.972z"/> </g> <g> <path d="M297.165,125.972c-24.932,0-45.222,20.284-45.222,45.219c0,24.94,20.29,45.219,45.222,45.219 c24.926,0,45.217-20.278,45.217-45.219C342.382,146.256,322.091,125.972,297.165,125.972z"/> </g> </g> </g> </g>
        </svg>
        <img src= {uselight? "/images/paltu_logo_light.png":"/images/paltu_logo.png"} style={{marginTop: isMobile ? "5.7%":"2.5%",marginLeft:isMobile ? "-10.5%":"-4.4%",position:"fixed",borderRadius:"10px"}} width="100" alt="" />
      </button>

      <div
        ref={drawerRef}
        style={{
          ...styles.drawer,backgroundColor: uselight ? "white":"#f69001", 
          ...(isOpen ? (isMobile ? styles.drawerVisibleMobile:styles.drawerVisible) : (isMobile ? styles.drawerHiddenMobile:styles.drawerHidden))
        }}
      >
        {isLoggedIn && caretaker ? (
          <>
            <div style={styles.profileSection}>
              <img
                src={caretaker.caretaker_image || "/api/placeholder/320/256"}
                alt="Profile"
                style={styles.profileImage}
              />
              <div style={{ 
                width: "100%", 
                display: "flex", 
                justifyContent: "center" // Centers children horizontally
              }}>
                <button style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  display: "flex",
                  justifyContent: "center", // Centers the image within the button
                  width: "fit-content" // Makes button only as wide as its content
                }} 
                onClick={()=> {router.push("/adopt")}}>
                  <img 
                    src="/images/adopt-button.png" 
                    height="90" 
                    style={{ marginTop: "-50%" }} 
                    alt="" 
                  />
                </button>
              </div>
              
              <div style={styles.profileInfo}>
                <div style={styles.profileName}>{caretaker.name || "Caretaker"} <br />(Hooman)</div>
              </div>
            </div>
          </>
        ) : (
          <div style={styles.loginSection}>
            <h2 onClick={() => router.push("/caretaker/login")} style={{ color: '#4db6ac',paddingTop:"1rem",paddingBottom:"1rem", marginBottom: '2rem',marginTop:"5rem",backgroundColor:"white",width:"100%",cursor:"pointer" }}>Log In/Sign Up</h2>
            <img src="/images/txt.png" height="50" alt="" /><br />
            <img onClick={()=> {router.push("/adopt")}} src="/images/adopt-button.png" height="90" style={{marginTop:"-5%"}} alt="" />
          </div>
        )}

        <div style={{...styles.menuContainer,width:"60%",marginLeft:"20%"}}>
        <button
              key="sd"
              style={styles.menuButton}
              onClick={() => {caretaker? router.push(`/caretaker/appeal?id=${id}`): router.push(`/caretaker/signup`)}}
            >
              Post Adoption Appeal
            </button>
          {menuItems.map((item, index) => (
            <button
              key={index}
              style={styles.menuButton}
              onClick={() => {}}
            >
              {item}
            </button>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
            >
              Logout
            </button>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}