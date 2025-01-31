"use client";
import React, { useRef,useState } from "react";
import "/public/css/PrintAdoptionForm.css";
import { Center, List, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import LoaderComponent from "../../components/LoaderComponent";
import SignatureCanvas from "react-signature-canvas";


const CaretakerFormWithTermsAndSignature = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sigCanvasRef = useRef<SignatureCanvas>(null);


  const dataURLtoBlob = (dataURL: string) => {
    const [header, data] = dataURL.split(",");
    const byteString = atob(data);
    const mimeString = header.split(":")[1].split(";")[0];
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  
  const handleSubmitSignature = async () => {
    alert("NOTE: By submitting your signature, you agree to our Terms and Conditions.");
    setLoading(true);
  
    const searchParams = new URLSearchParams(window.location.search);
    const applicationId = searchParams.get("id");
  
    if (!applicationId) {
      setMessage("Application ID is missing.");
      setLoading(false);
      return;
    }
  
    if (sigCanvasRef.current?.isEmpty()) {
      setMessage("Please provide your signature before submitting.");
      setLoading(false);
      return;
    }
    if (!sigCanvasRef.current){
      return;
    }
  
    // Convert the signature to a Blob
    const signatureDataURL = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    const signatureBlob = dataURLtoBlob(signatureDataURL);
  
    // Convert Blob to File
    const signatureFile = new File([signatureBlob], "signature.png", { type: "image/png" });
  
    try {
      // Compress the signature File
      const compressedSignature = await imageCompression(signatureFile, {
        maxSizeMB: 3,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
  
      // Prepare the FormData
      const formData = new FormData();
      formData.append("sign", compressedSignature);
      formData.append("id", applicationId);
  
      const response = await fetch("https://adoption-backed.vercel.app/caretaker/sign", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        router.push("/caretaker/login");
        setMessage("Signature uploaded successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "Failed to upload signature.");
      }
    } catch (error) {
      console.error("Error uploading signature:", error);
      setMessage("An error occurred while uploading the signature.");
    } finally {
      setLoading(false);
    }
  };
  

  const clearSignature = () => {
    sigCanvasRef.current?.clear();
  };
  return (
    <>
    {loading ? (<LoaderComponent />):(
    <div className="tnc" style={{ padding: "20px" }}>
      <h1>Caretaker Terms and Conditions</h1>
      <Stack gap={"md"}>
        <List>
          <List.Item>
            <p>
              With the unanimous consent of all my family members, I am willingly adopting the pet, assuming full responsibility and
              acknowledging that I will always regard my pet as an integral part of our family, ensuring that it is never treated merely as an
              object.
            </p>
          </List.Item>
          <List.Item>
            <p>
              I commit to maintaining a clean and well-ventilated environment for the adopted pet, providing proper nourishment, and ensuring
              regular exercise. I will refrain from keeping the animal tethered or chained with an unreasonably short or heavy restraint for an
              extended duration.
            </p>
          </List.Item>
          <List.Item>
            <p>
              I acknowledge that certain diseases may not be detectable during the initial checkup of the adopted pet, and the Animals With
              Humanity Team will not be held responsible for such conditions. Therefore, it is recommended to conduct a comprehensive
              post-adoption health examination.
            </p>
          </List.Item>
          <List.Item>
            <p>
              If the pet I adopt becomes unwell, I will promptly seek advice from a veterinarian and notify the Animals With Humanity Team.
              Additionally, I will take responsibility for adhering to the deworming, vaccination, and sterilization schedule for the
              well-being of the pet.
            </p>
          </List.Item>
        </List>
      </Stack>
      <List>
        <List.Item>
          <p>
            Should the responsibility of pet parenting need to be transferred, I will provide advance notice to both the caretaker and Team
            Animals With Humanity. I understand that the adoption process will need to be repeated for the new caretakers, and a fine of Rs.
            5,000/- will be duly acknowledged and paid.
          </p>
        </List.Item>
        <List.Item>
          <p>
            I acknowledge that the Animals With Humanity Team possesses the authority to conduct unannounced inspections of the conditions in
            which I'm taking care for the adopted pet. In the event of any violations, the Animals With Humanity Team is empowered to take
            legal action as per applicable law.
          </p>
        </List.Item>
        <List.Item>
          <p>
            I ______________ acknowledge that abandoning or subjecting my pet to mistreatment may lead to legal consequences under the
            Prevention of Cruelty to Animals Act of 1960. In case my pet is found in any such situation, Team Animals With Humanity will take
            a fine upto Rs. 10,000/- depending on the situation and proceed with legal action.
          </p>
        </List.Item>
        <List.Item>
          <p>I enter into this contract of my own free will and understand that this is a binding contract enforceable by civil law.</p>
        </List.Item>
      </List>

      <div style={{ padding: "20px" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "5% auto",
              }}
            >
              <h2>Caretaker's Signature</h2>
              <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                  style: { border: "1px solid #ccc" },
                }}
              />
              <button
                onClick={clearSignature}
                style={{
                  marginTop: "10px",
                  padding: "5px 15px",
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>

            <button
              onClick={handleSubmitSignature}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit Signature
            </button>

            {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default CaretakerFormWithTermsAndSignature;
