'use client';
import React, { useState } from "react";

const AdoptionForm = () => {
  const[id,setid]=useState();
  const[showmsg,setmsg]=useState("none");
  const[hideform,setform]=useState("block");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    whatsapp: "",
    Email:"",
    hometype: "",
    address: "",
    occupation: "",
    social:"",
    incamp:true
  });
  const [adopterImage, setAdopterImage] = useState(null);
  const [adopterDoc, setAdopterDoc] = useState(null);

  // Handle form field changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "incamp" ? (value === "yes") : value,
    });
  };

  // Handle file inputs
  const handleFileChange = (e:any) => {
    const { name, files } = e.target;
    if (name === "adopter_image") {
      setAdopterImage(files[0]);
    } else if (name === "adopter_doc") {
      setAdopterDoc(files[0]);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const queryParams = new URLSearchParams(window.location.search);
    const tagId = queryParams.get("tag_id") || null;
    
    const formPayload = new FormData();
    formPayload.append("tag_id", String(tagId) );
    formPayload.append("name", formData.name);
    formPayload.append("contact", formData.contact);
    formPayload.append("whatsapp", formData.whatsapp);
    formPayload.append("email",formData.Email)
    formPayload.append("address", formData.address);
    formPayload.append("occupation", formData.occupation);
    formPayload.append("hometype", formData.hometype);
    formPayload.append("social",formData.social)
    formPayload.append("incamp", formData.incamp ? "true" : "false");
    if (!adopterImage || !adopterDoc) {
      alert("Please upload both Adopter Image and Adopter Document.");
    };    
    if (adopterImage) formPayload.append("adopter_image", adopterImage);
    if (adopterDoc) formPayload.append("adopter_doc", adopterDoc);
    
    try {
      const response = await fetch("https://2d23-2405-201-3001-b153-ab27-cfc-214-da68.ngrok-free.app/applications/applications/", {
        headers:{'ngrok-skip-browser-warning':'1'},
        method: "POST",
        body: formPayload,
      });
      
      if (response.ok) {
        const data= await response.json();
        setid(data.application_id);
        setmsg("block");
        setform("none");
      } else {
        const errorResponse = await response.json();
        alert(`Failed to submit form: ${errorResponse.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      color: "#5f4230",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      backgroundColor: "#fff9f2",
    },
    alert:{
      display: showmsg,
      color:"#fff9f2",
      backgroundColor:"#5f4230",
      margin:"10px",
      padding:"20px",
      borderRadius: "10px"

    },
    imgRight: {
      marginLeft: "70%",
      width: "30%",
      height: "8vh",
    },
    formContainer: {
      marginBottom: "1vh",
      background: "#f69001",
      padding: "50px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "90%",
      maxWidth: "400px",
      display: hideform
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#ffffff",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      border: "none",
      backgroundColor: "#fff505",
      color: "rgb(0, 0, 0)",
      borderRadius: "100px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };
  return (
    <div style={styles.body}>
      <img style={styles.imgRight} src="/top-right.png" alt="" />
      <h1>Adoption Form</h1>
      <div style={styles.alert}>
      <h1>Form submitted successfully!</h1>
      <h2>Your form ID is {id}</h2>
      <p>NOTE: please note your application id from tracking prepouses it will not be displayed agian</p>
      <a href="/paltu">CONTINUE...</a>
      </div>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Please enter the following details -</label>
          <br />
          <label htmlFor="name" style={styles.label}>
            Apka Naam:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="contact" style={styles.label}>
            Contact no.:
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="whatsapp" style={styles.label}>
            Whatsapp no.:
          </label>
          <input
            type="text"
            id="whatsapp"
            name="whatsapp"
            placeholder="Enter your Whatsapp number"
            value={formData.whatsapp}
            onChange={handleInputChange}
            required
            style={styles.input}
          />


          <label htmlFor="occupation" style={styles.label}>
            Occupation:
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            placeholder="Enter your occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          
          <label htmlFor="Email" style={styles.label}>
            Email Address:
          </label>
          <input
            type="text"
            id="Email"
            name="Email"
            placeholder="Enter your occupation"
            value={formData.Email}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="hometype" style={styles.label}>
            Home type:
          </label>
          <input
            type="text"
            id="hometype"
            name="hometype"
            placeholder="Flat, Duplex, or others"
            value={formData.hometype}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="Social" style={styles.label}>
          Instagram/Facebook ID:
          </label>
          <input
            type="text"
            id="social"
            name="social"
            placeholder="Instagram/Facebook ID"
            value={formData.social}
            onChange={handleInputChange}
            required
            style={styles.input}
          />


          <label htmlFor="incamp" style={styles.label}>
            Are you currently in adoption camp 7.0?
          </label>
          <select
            id="incamp"
            name="incamp"
            value={formData.incamp ? "yes":"no"}
            onChange={handleInputChange}
            style={styles.input}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>


          <label htmlFor="address" style={styles.label}>
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="adopter_doc" style={{ width: "48%" }}>
              Attach an image of your ID for verification:
              <input
                id="adopter_doc"
                name="adopter_doc"
                type="file"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </label>
            <label htmlFor="adopter_image" style={{ width: "48%" }}>
              Attach a passport size photo:
              <input
                id="adopter_image"
                name="adopter_image"
                type="file"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </label>
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};


export default AdoptionForm;
