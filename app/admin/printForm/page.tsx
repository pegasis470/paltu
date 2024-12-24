"use client";
import React, { useEffect, useState } from "react";
import "/public/css/PrintAdoptionForm.css";
import { Center, List, Loader, Stack } from "@mantine/core";

interface FormData {
  meta: {
    id: number;
    tag_id: number;
  };
  Animal: {
    age: number;
    type: string;
    gender: string;
    fitness: string;
    sterilisation: boolean;
    vaccination: boolean;
    photos: string;
  };
  Caretaker: {
    caretaker: string;
    contact: string;
    whatsapp: string | null;
    address: string | null;
    social: string | null;
    occupation: string | null;
    caretaker_image: string | null;
    caretaker_doc: string | null;
  };
  Adoptor: {
    name: string;
    occupation: string;
    contact: string;
    whatsapp: string;
    address: string;
    pets: boolean;
    home_type: string;
    adopter_image: string;
    adopter_doc: string;
    aloneTime: string;
    caretakerDuringTravel: string;
    relocationPlans: string;
  };
  GenralInformation:{
    councler:string;
    pets:string;
    alone:string;
    temp_caretaker:string;
    plans:string
  }
}

const AdoptionForm = () => {
  const [data, setData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const applicationId = searchParams.get("application_id");

      try {
        const response = await fetch(`https://adoption-backed.vercel.app/form/form?application_id=${applicationId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching form data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const printPage = () => {
    window.print();
  };

  if (loading) {
    return (
      <Center mt={"200px"}>
        <Loader />
      </Center>
    );
  }

  if (!data || !data.meta || !data.Animal || !data.Caretaker || !data.Adoptor ) {
    return <div>Form data is incomplete or not found</div>;
  }

  return (
      <div className="page">
        <p>Serial Number: {data.meta?.id || 'N/A'}</p>
        <div className="logoContainer">
          <img src="/images/AWH-logo.png" alt="AWH Logo" width="200" />
        </div>
        <h1 className="title">ADOPTION & CONSENT FORM</h1>
        <div className="grid-2 form-1" style={{display:"flex",width:"100%"}}>
          <p>Date: _______________</p> <p style={{marginLeft:"50%"}}>Name of Counselor: {data.GenralInformation.councler}</p>
        </div>
        <Stack gap={"md"}>
          <h2 className="subtitle">Description of Animal</h2>
          <div className="grid-1">
            <div className="description">
              <p>Sex: {data.Animal?.gender || 'N/A'}</p>
              <p>Age: {data.Animal?.age || 'N/A'}</p>
              <p>Breed: {data.Animal?.type || 'N/A'}</p>
              <p>Physical Fitness Status: {data.Animal?.fitness || 'N/A'}</p>
              <p>Vaccination Status: {data.Animal?.vaccination ? "yes" : "no"}</p>
              <p>Sterilization Status: {data.Animal?.sterilisation ? "yes" : "no"}</p>
            </div>
            <div className="image">
              <img src={data.Animal.photos} alt="Dog" width="200" />
            </div>
          </div>
          <div style={{display:"flex"}}>
          <h2 className="subtitle">Details of Caretaker</h2>
          <h2 className="subtitle">Details of Adopter</h2>
          </div>
          <div style={{display:"flex"}}>
          <div className="grid-2">
            <div className="description">
              <p>Name of Caretaker: {data.Caretaker?.caretaker || 'N/A'}</p>
              <p>Contact No.: {data.Caretaker?.contact || 'N/A'}</p>
              <p>WhatsApp No.: {data.Caretaker?.whatsapp || 'N/A'}</p>
              <p>Occupation: {data.Caretaker?.occupation || 'N/A'}</p>
              <p>Local Residence: {data.Caretaker?.address || 'N/A'}</p>
              <p>Instagram/Facebook ID: {data.Caretaker?.social || 'N/A'}</p>
            </div>
            <div className="image">
              <div>
                <img src={data.Caretaker.caretaker_image|| "https://res-console.cloudinary.com/dsm1ingy6/media_explorer_thumbnails/7819b64128d64c1755383c3e00f0ab50/detailed"} alt="Caretaker" width="200" />
                <p className="signature">Date, Signature & Name of Caretaker</p>
              </div>
            </div>
          </div>
            <div className="grid-2">
            <div className="description">
              <p>Name of Adopter: {data.Adoptor?.name || 'N/A'}</p>
              <p>Contact No.: {data.Adoptor?.contact || 'N/A'}</p>
              <p>WhatsApp No.: {data.Adoptor?.whatsapp || 'N/A'}</p>
              <p>Home Type: {data.Adoptor?.home_type || 'N/A'}</p>
              <p>Permanent Residence: {data.Adoptor?.address || 'N/A'}</p>
            </div>
            <div className="image">
              <div>
                <img src={data.Adoptor?.adopter_image } alt="Adopter" width="200" />
                <p className="signature">Date, Signature & Name of Adopter</p>
              </div>
            </div>
            </div>
          </div>
        </Stack>

        <Stack gap={"md"}>

          <h2 className="subtitle" style={{width:"100%"}}>General Information</h2>
          <List spacing={"md"}>
            <List.Item>
              <p>Have you had a pet before or have one right now? 
                <br/>
                <p>{data.GenralInformation?.pets ? "Yes" : "No"}</p></p>
            </List.Item>
            <List.Item>
              <p>Amount of time your pet may have to be alone in a day?
              <br/><p>{data.GenralInformation?.alone || 'N/A'}</p> </p>
            </List.Item>
            <List.Item>
              <p>Who will take care of your pet if you go out of town temporarily? 
                <br /> <p>{data.GenralInformation?.temp_caretaker || 'N/A'}</p></p>
            </List.Item>
            <List.Item>
              <p>What are your plans for your pet if you shift to another town/place? 
                <br /><p>{data.GenralInformation?.plans || 'N/A'}</p></p>
            </List.Item>
          </List>

          <h2 className="subtitle" style={{width:"100%"}}>Consent</h2>
          <List>
            <List.Item>
              <p>
                With the unanimous consent of all my family members, I am willingly adopting the pet, assuming full responsibility and acknowledging that I will always regard my pet as an integral
                part of our family, ensuring that it is never treated merely as an object.
              </p>
            </List.Item>
            <List.Item>
              <p>
                I commit to maintaining a clean and well-ventilated environment for the adopted pet, providing proper nourishment, and ensuring regular exercise. I will refrain from keeping the animal
                tethered or chained with an unreasonably short or heavy restraint for an extended duration.
              </p>
            </List.Item>
            <List.Item>
              <p>
                I acknowledge that certain diseases may not be detectable during the initial checkup of the adopted pet, and the Animals With Humanity Team will not be held responsible for such
                conditions. Therefore, it is recommended to conduct a comprehensive post-adoption health examination.
              </p>
            </List.Item>
            <List.Item>
              <p>
                If the pet I adopt becomes unwell, I will promptly seek advice from a veterinarian and notify the Animals With Humanity Team. Additionally, I will take responsibility for adhering to
                the deworming, vaccination, and sterilization schedule for the well-being of the pet.
              </p>
            </List.Item>
          </List>
        </Stack>
        <List>
          <List.Item>
            <p>
              Should the responsibility of pet parenting need to be transferred, I will provide advance notice to both the caretaker and Team Animals With Humanity. I understand that the adoption
              process will need to be repeated for the new caretakers, and a fine of Rs. 5,000/- will be duly acknowledged and paid.
            </p>
          </List.Item>
          <List.Item>
            <p>
              I acknowledge that the Animals With Humanity Team possesses the authority to conduct unannounced inspections of the conditions in which I'm taking care for the adopted pet. In the event
              of any violations, the Animals With Humanity Team is empowered to take legal action as per applicable law.
            </p>
          </List.Item>
          <List.Item>
            <p>
              I ______________ acknowledge that abandoning or subjecting my pet to mistreatment may lead to legal consequences under the Prevention of Cruelty to Animals Act of 1960. In case my pet is
              found in any such situation, Team Animals With Humanity will take a fine upto Rs. 10,000/- depending on the situation and proceed with legal action.
            </p>
          </List.Item>
          <List.Item>
            <p>I enter into this contract of my own free will and understand that this is a binding contract enforceable by civil law.</p>
          </List.Item>
        </List>
          <div style={{ width:"100%", maxWidth: "100%",display:"flex",textAlign:"center", justifyContent:"center", margin: "5% auto 5% auto" }}>
            <p>
              Adopter's Signature
              <br />
              __________________
              <br />
              (with name & date)
            </p>
            <p style={{marginLeft:"10%"}}>
              Caretaker's Signature
              <br />
              __________________
              <br />
              (with name & date)
            </p>
          </div>
          <div style={{ marginTop: "40px", maxWidth: "200px", margin: "2.5em auto 0 auto" }}>
            <hr />
          </div>

      <button onClick={printPage} className="printButton">
        Print
      </button>
    </div>
  );
};

export default AdoptionForm;