"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import LoaderComponent from "../../components/LoaderComponent";
import '/public/css/caretaker.css';


export default function CaretakerSignupPage() {
  const [formData, setFormData] = useState({
    caretaker: "",
    contact: "",
    occupation: "",
    social: "",
    whatsapp: "",
    houseNo: "",
    street: "",
    area: "",
    city: "",
    state: "",
    username: "",
    password: "",
  });

  const [caretakerImage, setCaretakerImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const router = useRouter();

  const formFields = [
    { label: "Name", name: "caretaker", type: "text", placeholder: "Apka Name" },
    { label: "Contact", name: "contact", type: "text", placeholder: "Apka contact number" },
    { label: "WhatsApp", name: "whatsapp", type: "text", placeholder: "Apka WhatsApp number" },
    { label: "Occupation", name: "occupation", type: "text", placeholder: "Apka occupation" },
    { label: "Social", name: "social", type: "text", placeholder: "Apka social handle" },
    { label: "House No.", name: "houseNo", type: "text", placeholder: "Apka house number" },
    { label: "Street", name: "street", type: "text", placeholder: "Apka street" },
    { label: "Area", name: "area", type: "text", placeholder: "Apka area" },
    { label: "City", name: "city", type: "text", placeholder: "Apka city" },
    { label: "State", name: "state", type: "text", placeholder: "Apka state" },
    { label: "Username", name: "username", type: "text", placeholder: "Choose a username" },
    { label: "Password", name: "password", type: "password", placeholder: "Choose a password" },
  ];

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input changes with compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 3,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setCaretakerImage(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  // Handle form submission
  const handleSignup = async () => {
    setIsSubmitting(true); // Show loader

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    const emptyFields = Object.entries(formData).filter(([_, value]) => !value);
  
  if (emptyFields.length > 0) {
    const emptyFieldNames = emptyFields.map(([key]) => key).join(', ');
    alert(`Please fill in all fields. Missing: ${emptyFieldNames}`);
    return;
  }

  // Check if image is uploaded on last step
  if (currentStep === formFields.length - 1 && !caretakerImage) {
    alert('Please upload your photo');
    return;
  }
    if (caretakerImage) formPayload.append("caretaker_image", caretakerImage);
    const fullAddress = `${formData.houseNo}, ${formData.street}, ${formData.area}, ${formData.city}, ${formData.state}`;
    formPayload.append("address", fullAddress);

    try {
      const response = await fetch("https://adoption-backed.vercel.app/caretaker/caretaker/", {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Account created successfully! Your username is ${formData.caretaker}.`);
        router.push(`/caretaker/sign?id=${data.id}`);
      } else {
        const errorData = await response.json();
        const errorMessage =
          typeof errorData.detail === "string"
            ? errorData.detail
            : Array.isArray(errorData.detail)
            ? errorData.detail.map((err: any) => err.msg).join(", ")
            : "Signup failed!";
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("An error occurred while signing up.");
    } finally {
      setIsSubmitting(false); // Hide loader
    }
  };

  // Move to the next step
  const handleNext = () => {
    if (currentStep < formFields.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Move to the previous step
  const handleBack = () => {  
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
    <div id='main'>
      <div className='header'>
          <img src="/images/paltu_logo_full.png" style={{marginLeft:"85%"}} width="200" alt="" />
      </div>  
      <div style={{backgroundColor:"white", width:"30%",marginLeft:"18%",borderRadius:"20px", padding:"2%",marginTop:"10%"}}>
      <h1 style={{fontFamily:"MoreSugar",color:"#54b1b1"}}>Signup</h1>
      <h2 style={{fontFamily:"Alkarta",color:"black",marginLeft:"10%"}}>कीजिए...</h2>
      <div style={{display:"flex",height:"10%"}}>
      {currentStep > 0 && (
                  <button type="button" style={{border:"none",backgroundColor:"white", fontFamily:"MoreSugar",fontSize:"400%",margin:"5%",height:"10%"}} onClick={handleBack}>
                    &lt;
                  </button>
                )}
      <form onSubmit={(e) => e.preventDefault()}>
                <div style={{width:"100%"}}>
                <p style={{backgroundColor:"#f69001",border:"none",marginTop:"5%",marginBottom:"5%",borderRadius:"0 20px 20px 0",fontSize:"150%",color:"black",fontFamily:"MoreSugar",width:"100%",paddingRight:"15%",paddingTop:"1%",paddingBottom:"1%"}}>
                {formFields[currentStep].label}
                </p>
                </div>
                <input
                style={{backgroundColor:"#f69001",border:"none",marginTop:"1%",marginBottom:"5%",borderRadius:"0 20px 20px 0",fontSize:"150%",color:"black",fontFamily:"MoreSugar"}}
                  type={formFields[currentStep].type}
                  name={formFields[currentStep].name}
                  placeholder={formFields[currentStep].placeholder}
                  value={formData[formFields[currentStep].name as keyof typeof formData]}
                  onChange={handleInputChange}
                  required
                />
              <br />
              {currentStep === formFields.length - 1 && (
                <>
                  <label style={{fontFamily:"MoreSugar"}}>
                    Caretaker Image:
                    <input
                      type="file"
                      name="caretaker_image"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </>
              )}
              </form>
              {currentStep < formFields.length - 1 ? (
                  <button type="submit" style={{border:"none",backgroundColor:"white", fontFamily:"MoreSugar",fontSize:"400%",margin:"5%",height:"10%"}} onClick={handleNext}>
                    &gt;
                  </button>
                ) : (
                  <p></p>
                )}
      </div> 
      {currentStep < formFields.length - 1 ? (<></>):(
      <button type="button" style={{border:"none",backgroundColor:"white",color:"#54b1b1",fontFamily:"LeagueSpartan",fontSize:"150%",marginTop:"10%"}} onClick={handleSignup}>
                    Let' s Go !!
                  </button> )} 
      </div>
      <div className="center"style={{marginTop:"-23%",textAlign:"left",marginLeft:"50%"}}>
        <h1>Want to be <br />
        a part of the <br /> world where <br /> people <br /> actually love <br /> animals?</h1>
      </div>
    </div>
    </>
  );
}
