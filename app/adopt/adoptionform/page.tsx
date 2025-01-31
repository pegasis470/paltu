'use client';
import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import { useRouter } from "next/navigation";
import LoaderComponent from "../../components/LoaderComponent";


const AdoptionForm = () => {
  const[id,setid]=useState();
  const[showmsg,setmsg]=useState("none");
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const[hideform,setform]=useState("block");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    whatsapp: "",
    Email: "",
    occupation:"",
    hometype: "",
    social: "",
    incamp: true,
    houseNo: "",
    street: "",
    area: "",
    city: "",
    state: "",
    home_type:"",
    address_permanent: "",
  });
  const [adopterImage, setAdopterImage] = useState<File | null>(null);
  const [adopterDoc1, setAdopterDoc1] = useState<File | null>(null);
  const [adopterDoc2, setAdopterDoc2] = useState<File | null>(null);

  // Handle form field changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "incamp" ? (value === "yes") : value,
    });
  };

  // Handle file inputs
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
        const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 800, // Max width or height
            useWebWorker: true, // Use Web Worker for better performance
        };

        try {
            if (name === "adopter_image") {
                const originalFile = files[0];
                const compressedBlob = await imageCompression(originalFile, options);
                const compressedFile = new File([compressedBlob], originalFile.name, {
                    type: originalFile.type,
                    lastModified: Date.now(),
                });
                setAdopterImage(compressedFile);
            } else if (name === "adopter_doc") {
                if (files.length !== 2) {
                    alert("Please select exactly 2 files for adopter documents.");
                    return;
                }

                const compressedFiles: File[] = [];
                for (const file of Array.from(files) as File[]) {
                    const compressedBlob = await imageCompression(file, options);
                    const compressedFile = new File([compressedBlob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });
                    compressedFiles.push(compressedFile);
                }
                // Store the two compressed files separately
                setAdopterDoc1(compressedFiles[0]);
                setAdopterDoc2(compressedFiles[1]);
            }
        } catch (error) {
            console.error("Image compression error:", error);
            alert("An error occurred while compressing the images.");
        }
    }
};


  
  // Handle form submission
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
  
    // Combine address components into a single line
    const fullAddress = `${formData.houseNo}, ${formData.street}, ${formData.area}, ${formData.city}, ${formData.state}`;
    
    const queryParams = new URLSearchParams(window.location.search);
    const tagId = queryParams.get("tag_id") || null;
  
    const formPayload = new FormData();
    formPayload.append("animal_tag_id", String(tagId));
    formPayload.append("name", formData.name);
    formPayload.append("contact", formData.contact);
    formPayload.append("whatsapp", formData.whatsapp);
    formPayload.append("email", formData.Email);
    formPayload.append("address", fullAddress); // Use merged address
    formPayload.append("address_permanent", formData.address_permanent);
    formPayload.append("occupation", formData.occupation);
    formPayload.append("social", formData.social);
    formPayload.append("house_type",formData.home_type);
    formPayload.append("incamp", formData.incamp ? "true" : "false");
  
    if (!adopterImage || !adopterDoc1) {
      alert("Please upload both Adopter Image and Adopter Document.");
      setLoading(false);
      return;
    }
  
    if (adopterImage) formPayload.append("adopter_image", adopterImage);
    if (adopterDoc1) formPayload.append("adopter_doc_front", adopterDoc1);
    if (adopterDoc2) formPayload.append("adopter_doc_back", adopterDoc2);

  
    try {
      const response = await fetch("http://127.0.0.1:8000/applications/applications/", {
        headers: { "ngrok-skip-browser-warning": "1" },
        method: "POST",
        body: formPayload,
      });
  
      if (response.ok) {
        const data = await response.json();
        setid(data.application_id);
        alert(`your Application ID is ${data.application_id} \nNOTE: please note your application id for tracking purposes. It will not be displayed again.`)
        setmsg("block");
        setform("none");
        setTimeout(() => {
          router.push('/')
        }, 2000);
      
      } else {
        const errorResponse = await response.json();
        alert(`Failed to submit form: ${errorResponse.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
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
    <>
      {loading ? (<div style={{overflow:"hidden"}}>
        <LoaderComponent /></div>
      ) : (
        <div style={styles.body}>
          <img style={styles.imgRight} src="/top-right.png" alt="" />
          <h1>Adoption Form</h1>
          <div style={styles.alert}>
            <h1>Form submitted successfully!</h1>
            <h2>Your form ID is {id}</h2>
            <p>NOTE: please note your application id for tracking purposes. It will not be displayed again.</p>
            <a href="/">CONTINUE...</a>
          </div>
          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              {/* Form Inputs */}
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


          <label htmlFor="houseNo" style={styles.label}>House No.:</label>
          <input
            type="text"
            id="houseNo"
            name="houseNo"
            placeholder="Enter your house number"
            value={formData.houseNo}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="street" style={styles.label}>Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Enter your street"
            value={formData.street}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="area" style={styles.label}>Area:</label>
          <input
            type="text"
            id="area"
            name="area"
            placeholder="Enter your area"
            value={formData.area}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="city" style={styles.label}>City:</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleInputChange}
            required
            style={styles.input}
          />

          <label htmlFor="state" style={styles.label}>State:</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="Enter your state"
            value={formData.state}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <label htmlFor="address_permanent" style={styles.label}>
            Permanent Address:
          </label>
          <input
            type="text"
            id="address_permanent"
            name="address_permanent"
            placeholder="Enter your address"
            value={formData.address_permanent}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="adopter_doc">
    Adopter Documents (Select 2 files):
    <input
        id="adopter_doc"
        name="adopter_doc"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
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
      )}
    </>
  );
};


export default AdoptionForm;
