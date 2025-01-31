"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import Modal from 'react-modal';


interface Application {
  id: number;
  name: string;
  occupation: string;
  animal_id: number;
  contact: string;
  whatsapp: string;
  address: string;
  email: string | null;
  adopter_image: string;
  adopter_doc_front: string;
  adopter_doc_back: string;
  status: string;
  incamp: boolean;
  remarks:string;
  animal_details:{id:number}
  caretaker_details:{
    id:number;
    name:string;
    Contact_number:string
    whatsapp:string
  }
}

interface Caretaker {
  id: number;
  Caretaker: string;
  Contact: string;
  Whatsapp: string;
  username: string;
  password: string;
  approved:string;
  registered_animals:number
}

interface CaretakerDetails {
  id: number;
  name: string;
  contact: string;
  caretaker_whatsapp: string;
  caretaker_add: string;
  caretaker_social: string;
  caretaker_occ: string;
  caretaker_username: string;
  caretaker_password: string;
  caretaker_image: string;
  approved: string;
  signeture:string;
  number_of_reg:string;
  animals:{
    photos:string
  }
}

export default function AdminPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [isVisible,setsearch]=useState(false);
  const [Adoptormodal,setAdoptorModel]=useState(false);
  const [Caretakermodal,setCaretakerModel]=useState(false);
  const [iscaretakerVisible,setcaretakersearch]=useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [Caretaker, setCaretakers] = useState<Caretaker[]>([]);
  const [allapprovedcaretkers,setapprovedcaretakers]=useState<Caretaker[]>([]);
  const [selectedcaretaker, setSelectedcaretaker] = useState<CaretakerDetails | null>(null);
  const [approvedappid,setsearchid]=useState(null);
  const [allapprovedapp,setapprovedApplications]=useState<Application[]>([]);
  const[signeturelink,setsigneture]=useState<String | null>();
  const[user,setuser]=useState<String | null>();
  const [formData, setFormData] = useState({
    councler_name: "",
    plans: "",
    pets: "",
    alone: "",
    temp_caretaker: "",
  });
  const[remark,setRemarks]=useState<String|null>();
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const username = queryParams.get("username");
        setuser(username)
        if (!username) {
          setMessage("Incorrect link username is invalid");
          return;
        }
        setFormData({ ...formData, councler_name: username })
        const response = await fetch(`https://adoption-backed.vercel.app/users/users/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const auth_token=Cookies.get('auth_token');
            if (!auth_token) {
                alert('Caretaker authorization Failed: Auth token missing');
                router.push('/caretaker/login ')
                return;
            }
        const userData = await response.json();
  
        if (userData.status === "Online" && userData.auth_token === auth_token  ) {
          const applicationsResponse = await fetch("https://adoption-backed.vercel.app/applications/applications/");
          if (!applicationsResponse.ok) {
            throw new Error("Failed to fetch applications");
          }
  
          const applicationsData = await applicationsResponse.json();
  
          // Filter applications to show only those with status "Pending"
          const pendingApplications = applicationsData.filter(
            (application: { status: string }) => application.status === "Pending"
          );
          setApplications(pendingApplications);
          const caretakersResponse = await fetch("https://adoption-backed.vercel.app/caretaker/caretaker/");
          if (!caretakersResponse.ok) {
            throw new Error("Failed to fetch applications");
          }
  
          const caretakersData = await caretakersResponse.json();
          const pendingcaretakers = caretakersData.filter(
            (caretaker: { approved: string }) => caretaker.approved === "Pending"
          );
          setCaretakers(pendingcaretakers);
        } else {
          setMessage("You are not logged in, please contact IT dept to give you access.Or go to the login page and try agian");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("You are not logged in, please contact IT dept to give you access.Or go to the login page and try agian");
      }
    };
  
    checkUserStatus();
  }, []);
  const search = ()=>{
    router.push(`/admin/printForm?application_id=${approvedappid}`)
  };
  const handleInputChange = (event:any) => {
    setsearchid(event.target.value); // Update state with input value
};
  const Showsearchbar= async ()=>{
    if (!isVisible){
      const applicationsResponse = await fetch("https://adoption-backed.vercel.app/applications/applications/");
          if (!applicationsResponse.ok) {
            throw new Error("Failed to fetch applications");
          }
  
          const applicationsData = await applicationsResponse.json();
  
          // Filter applications to show only those with status "Pending"
          const pendingApplications = applicationsData.filter(
            (application: { status: string }) => application.status === "Approved" || application.status === "Cancled" 
          );
          setapprovedApplications(pendingApplications);
    setsearch(true);
    }
    else{
      setsearch(false);
    }
  }
  const fetchApplicationDetails = async (applicationId: number) => {
    try {
      const response = await fetch(`https://adoption-backed.vercel.app/applications/applications/${applicationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch application details");
      }
      setAdoptorModel(true);
      const data = await response.json();
      setSelectedApplication(data);
      setsigneture(`${ window.location.origin}/TNC?application_id=${applicationId}`)
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };
  const fetchCaretakerDetails = async (caretakerId: number) => {
    try {
      const response = await fetch(`https://adoption-backed.vercel.app/caretaker/caretaker/${caretakerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch application details");
      }
      const data = await response.json();
      setCaretakerModel(true);
      setSelectedcaretaker(data);
    } catch (error) {
      console.error("Error fetching application details:", error);
    }
  };
  const closeModal = () => {
    setAdoptorModel(false);
    setCaretakerModel(false)
  }
  const ShowCaretakers= async ()=>{
    if (!iscaretakerVisible){
      const caretakerResponse = await fetch("https://adoption-backed.vercel.app/caretaker/caretaker");
          if (!caretakerResponse.ok) {
            throw new Error("Failed to fetch applications");
          }
  
          const caretakerData = await caretakerResponse.json();
  
          // Filter applications to show only those with status "Pending"
          const approvedCaretakers = caretakerData.filter(
            (caretaker: { approved: string }) => caretaker.approved != "Pending"
          );
          setapprovedcaretakers(approvedCaretakers);
          setcaretakersearch(true);
    }
    else{
      setcaretakersearch(false);
    }
  }

  const handleFormApprove = async () => {
    if (!selectedApplication) {
      alert("No application selected!");
      return;
    }

    try {
      const response = await fetch(
        `https://adoption-backed.vercel.app/form/approve?application_id=${selectedApplication.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form submitted successfully!");
      setFormData({...formData, plans: "", pets: "", alone: "", temp_caretaker: "" }); // Reset form
      setSelectedApplication(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form data");
    }
  };
  
  const handleCaretakerApprove = async () => {
    if (!selectedcaretaker) {
      alert("No application selected!");
      return;
    }

    try {
      const response = await fetch(
        `https://adoption-backed.vercel.app/caretaker/approve?id=${selectedcaretaker.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form submitted successfully!");
      setSelectedcaretaker(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form data");
    }
  };
  const handleCaretakerBlacklist = async () => {
    if (!selectedcaretaker) {
      alert("No application selected!");
      return;
    }

    try {
      const response = await fetch(
        `https://adoption-backed.vercel.app/caretaker/blacklist?id=${selectedcaretaker.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form submitted successfully!");
      setSelectedcaretaker(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form data");
    }
  };
  const handleFormDecline = async () => {
    if (!selectedApplication) {
      alert("No application selected!");
      return;
    }

    try {
      const response = await fetch(
        `https://adoption-backed.vercel.app/form/decline?application_id=${selectedApplication.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form submitted successfully!");
      setFormData({...formData, plans: "", pets: "", alone: "", temp_caretaker: "" }); // Reset form
      setSelectedApplication(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form data");
    }
  };
  const handleFormCancle = async () => {
    if (!selectedApplication) {
      alert("No application selected!");
      return;
    }

    try {
      const response = await fetch(
        `https://adoption-backed.vercel.app/form/cancle?application_id=${selectedApplication.id}&remarks=${remark}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form submitted successfully!");
      setFormData({...formData, plans: "", pets: "", alone: "", temp_caretaker: "" }); // Reset form
      setSelectedApplication(null);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form data");
    }
  };
  const handleLogout = async () => {
    try {
      // Get the username from the URL query parameter
      const queryParams = new URLSearchParams(window.location.search);
      const username = queryParams.get("username");

      if (!username) {
        alert("Username not provided in the URL.");
        return;
      }

      // Send logout request
      const response = await fetch(`https://adoption-backed.vercel.app/users/users/logout?user=${username}`, {
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
      router.push("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };



  return (
    <div style={{ padding: "20px" }}>
      {message ? (
        <p>{message}</p>
      ) : 
      (
        <>
          <div style={{ width: "100%",display:"flex",textAlign:"center"}} > 
            <img src="/images/AWH-logo.png" height={"100"} alt="" />
            <h1 style={{width:"100%"}}>ADMIN DASHBORAD</h1>
            <img height={"100"} style={{marginLeft:"0%"}} src="/images/paltu logo.png" alt="" />
          </div>
          <div className="info" style={{width:"100%",display:"flex",alignItems:"end"}}>
            <h2>Welcome, {user}</h2>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff6347",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginLeft: "84.5%",
                marginTop:"10px"
              }}
            >
              Logout
            </button>
          </div>
          <div className="main" >
            <div className="leads">
              <div style={{display:"flex",width:"100%",alignItems:"end"}}>
                <h2>Leads:</h2>
                <button
                  onClick={Showsearchbar}
                  style={{
                    padding: "10px 20px",
                      backgroundColor: "#075791",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      marginLeft:"82%",
                      marginTop:"10px"
                  }}>
                    Search approved applications 
                </button>
              </div>
              <div>
                {isVisible && (
                  <>
                    <div style={{ margin: "1%", display: "flex" }}>Enter form ID: <input onChange={handleInputChange}></input> <button style={{ marginLeft: "1%", display: "flex", backgroundColor: "#075791", color: "#fff", fontSize: "16px", padding: "1px 2px" }} onClick={search}>Search</button></div>
                          <div style={{display:"flex", overflow: "scroll"}}>
                              {allapprovedapp.map((app) => (
                                <div
                                  key={app.id}
                                  onClick={() => fetchApplicationDetails(app.id)}
                                  style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "15px",
                                    width: "500px",
                                    cursor: "pointer",
                                    backgroundColor: "#f9f9f9",
                                    marginTop: "1%"
                                  }}
                                >
                                  <h3>{app.name}</h3>
                                  <p>contact: {app.contact}</p>
                                  <p>Whatsapp: {app.whatsapp}</p>
                                  <p>Occupation: {app.occupation}</p>
                                  <p>Status: {app.status}</p>
                                </div>
                              ))
                              }
                            </div>
                    </>

                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {applications.map((app) => (
                          <div
                            key={app.id}
                            onClick={() => fetchApplicationDetails(app.id)}
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              padding: "15px",
                              width: "200px",
                              cursor: "pointer",
                              backgroundColor: "#f9f9f9",
                              marginTop:"1%"
                            }}>
                              <h3>{app.name}</h3>
                              <p>Contact: {app.contact}</p>
                              <p>whatsapp: {app.whatsapp}</p>
                              <p>Occupation: {app.occupation}</p>
                              <p>Status: {app.status}</p>
                          </div>
                        ))}
                </div>
                {/*Caretaker section*/}
                <div style={{display:"flex"}}><h1>Caretakers Section:</h1> <button style={{
              padding: "10px 20px",
                backgroundColor: "#075791",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginLeft:"67%"
            }} onClick={ShowCaretakers}>Reviewed caretakers</button></div>
          {iscaretakerVisible && (<>
            <div style={{display:"flex", overflow: "scroll"}}>
                {allapprovedcaretkers.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => fetchCaretakerDetails(app.id)}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      width: "500px",
                      cursor: "pointer",
                      backgroundColor: "#f9f9f9",
                      marginTop: "1%"
                    }}
                  >
                    <h3>{app.Caretaker}</h3>
                    <p>contact: {app.Contact}</p>
                    <p>Whatsapp: {app.Whatsapp}</p>
                    <p>Username: {app.username}</p>
                    <p>Password: {app.password}</p>
                    <p>Status: {app.approved}</p>
                    <p>Number of registered animals: {app.registered_animals}</p>
                  </div>
                ))}
              </div></>
          
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {Caretaker.map((app) => (
              <div
                key={app.id}
                onClick={() => fetchCaretakerDetails(app.id)}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  width: "200px",
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9",
                  marginTop:"1%"
                }}
              >
                <h3>{app.Caretaker}</h3>
                <p>contact number: {app.Contact}</p>
                <p>contact whatsapp: {app.Whatsapp}</p>
                <p>Status: {app.approved}</p>
              </div>
            ))}
          </div>


                <Modal
      isOpen={Adoptormodal}
      onRequestClose={closeModal}
      contentLabel="Application Details"
    >
      <div >
        {/* Close Button */}
      <h1
            onClick={() => setAdoptorModel(false)}
            style={{textAlign:"right",cursor:"default"}}
          >
            X
          </h1>
      {selectedApplication && (
        <div className="application-details" style={{width:"100%"}}>
          <h2> Application Details</h2>
          {/* Adopter ID */}
          <h3 
          >
            Adopter ID: {selectedApplication.id}
          </h3>

          {/* Application Information */}
          <div style={{display:"flex",width:"100%"}}>
            {/* Adopter Details */}
            <div style={{paddingRight:"50%"}}>
              <h4 className="font-semibold mb-2">Adopter Information</h4>
              {[
                { label: 'Name', value: selectedApplication.name },
                { label: 'Occupation', value: selectedApplication.occupation },
                { label: 'Animal ID', value: selectedApplication.animal_id },
                { label: 'Contact', value: selectedApplication.contact },
                { label: 'WhatsApp', value: selectedApplication.whatsapp },
                { label: 'Address', value: selectedApplication.address },
                { label: 'Email', value: selectedApplication.email || 'N/A' },
                { label: 'Status', value: selectedApplication.status },
                { label: 'Present in camp', value: selectedApplication.incamp }
              ].map(({ label, value }) => (
                <p key={label} className="mb-1">
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>

            {/* Caretaker Details */}
            <div>
              <h4 className="font-semibold mb-2">Caretaker Information</h4>
              {[
                { label: 'Caretaker ID', value: selectedApplication.caretaker_details.id },
                { label: 'Caretaker Name', value: selectedApplication.caretaker_details.name },
                { label: 'Caretaker Contact', value: selectedApplication.caretaker_details.Contact_number },
                { label: 'Caretaker WhatsApp', value: selectedApplication.caretaker_details.whatsapp }
              ].map(({ label, value }) => (
                <p key={label} className="mb-1">
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
          </div>

          {/* Signature Link */}
          {selectedApplication.status === "Approved" && (
            <div >
              <strong>Signature Link:</strong>
              <p>{signeturelink}</p>
            </div>
          )}

          {/* Images */}
          <div style={{display:"flex"}}>
            <div>
              <strong>Adopter Image</strong>
              <br />
              <img
                src={selectedApplication.adopter_image}
                alt="Adopter"
              />
            </div>
            <div>
              <strong>Adopter Document (Front)</strong>
              <br />
              <img
                src={selectedApplication.adopter_doc_front}
                alt="Adopter Document Front"
              />
            </div>
            <div>
              <strong>Adopter Document (Back)</strong>
              <br />
              <img
                src={selectedApplication.adopter_doc_back}
                alt="Adopter Document Back"
                style={{textAlign:"start"}}
              />
            </div>
          </div>

          {/* Pending Application Actions */}
          {selectedApplication.status === "Pending" && (
            <div >
              <h4 >Additional Information</h4>
              <div>
                {[
                  { 
                    label: "What are your plans for your pet if you go out of town?", 
                    key: "plans",
                    value: formData.plans
                  },
                  { 
                    label: "Have you had a pet before?", 
                    key: "pets",
                    value: formData.pets
                  },
                  { 
                    label: "How long will your pet be alone?", 
                    key: "alone",
                    value: formData.alone
                  },
                  { 
                    label: "Who will take care of your pet if you go out temporarily?", 
                    key: "temp_caretaker",
                    value: formData.temp_caretaker
                  }
                ].map(({ label, key, value }) => (
                  <div key={key} >
                    <label style={{margin:"10px"}}>{label}</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      style={{width:"100%"}}
                    />
                  </div>
                ))}
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={handleFormApprove} 
                  style={{backgroundColor:"green", color:"white", padding:"2px", borderRadius:"2px",margin:"10px"}}

                >
                  Approve
                </button>
                <button 
                  onClick={handleFormDecline} 
                  style={{backgroundColor:"red", color:"white", padding:"2px", borderRadius:"2px",margin:"10px"}}
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Cancellation Section */}
          {selectedApplication.status === "Approved" && (
            <div className="mt-4">
              <label className="block mb-2">Reason to Cancel:</label>
              <input
                style={{width:"100%"}}
                type="text"
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <button 
                onClick={handleFormCancle} 
                style={{backgroundColor:"red", color:"white", padding:"2px", borderRadius:"2px",margin:"10px"}}

              >
                Cancel
              </button>
            </div>
          )}

          {/* Cancellation Remarks for Other Statuses */}
          {selectedApplication.status !== "Pending" && selectedApplication.status !== "Approved" && (
            <div>
              <label className="block mb-2">Cancellation Remarks:</label>
              <p>{selectedApplication.remarks}</p>
            </div>
          )}

        </div>
      )}
      </div>
    </Modal>


    <Modal
      isOpen={Caretakermodal}
      onRequestClose={closeModal}
      contentLabel="Caretaker Details"
    >
      {/* Close Button */}
      <h1
            onClick={() => setCaretakerModel(false)}
            style={{textAlign:"right",cursor:"default"}}
          >
            X
          </h1>
      {selectedcaretaker && (
      <div className="caretaker-details">
        <h2 className="text-2xl font-bold mb-4">Caretaker Details</h2>
        
        {/* Caretaker ID */}
        <h3 className="bg-black text-white p-2 mb-4 text-center text-xl">
          Caretaker ID: {selectedcaretaker.id}
        </h3>

        {/* Caretaker Information */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Name', value: selectedcaretaker?.name },
            { label: 'Occupation', value: selectedcaretaker.caretaker_occ },
            { label: 'Contact', value: selectedcaretaker.contact },
            { label: 'WhatsApp', value: selectedcaretaker.caretaker_whatsapp },
            { label: 'Address', value: selectedcaretaker.caretaker_add },
            { label: 'Status', value: selectedcaretaker.approved },
            { label: 'Number of Animals', value: selectedcaretaker.number_of_reg }
          ].map(({ label, value }) => (
            <p key={label} className="mb-1">
              <strong>{label}:</strong> {value}
            </p>
          ))}
        </div>

        {/* Images */}
        <div style={{display:"flex",width:"100%"}}>
          <div>
            <strong>Caretaker Image</strong>
            <br />
            <img
              src={selectedcaretaker.caretaker_image}
              alt="Caretaker"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <strong>Caretaker Signature</strong>
            <br />
            <img
              src={selectedcaretaker.signeture}
              alt="Caretaker Signature"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div >
          {selectedcaretaker?.approved === "Pending" && (
            <>
              <button 
                onClick={handleCaretakerApprove}
                style={{backgroundColor:"green", color:"white", padding:"2px", borderRadius:"2px",margin:"10px"}}
              >
                Approve
              </button>
              <button 
                onClick={handleCaretakerBlacklist}
                style={{backgroundColor:"red", color:"white", padding:"2px", borderRadius:"2px",margin:"10px"}}
              >
                Cancel
              </button>
            </>
          )}

          {selectedcaretaker?.approved === "Approved" && (
            <button 
              onClick={handleCaretakerBlacklist}
              style={{backgroundColor:"black", color:"white", padding:"2px", borderRadius:"2px",margin:"10px"}}
            >
              Blacklist
            </button>
          )}

          {selectedcaretaker?.approved === "Blacklist" && (
            <button 
              onClick={handleCaretakerApprove}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Remove from Blacklist
            </button>
          )}
          <br />
        </div>
      </div>)}
    </Modal>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
}
