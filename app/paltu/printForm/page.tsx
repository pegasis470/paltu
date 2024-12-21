"use client";
import React, { useEffect, useState } from "react";
import "/public/css/PrintAdoptionForm.css";
import { Center, List, Loader, Stack } from "@mantine/core";
const placeholderData = {
  meta: {
    id: 1,
    tag_id: 0
  },
  Animal: {
    age: 0,
    type: "string",
    gender: "Not sure",
    fitness: "string",
    sterilisation: true,
    vaccination: true,
    photos: "https://res.cloudinary.com/dsm1ingy6/image/upload/v1734518375/Paltu/yrgxkbz8mppp0ojbofhy.png"
  },
  Caretaker: {
    caretaker: "string",
    contact: "string",
    whatsapp: null,
    address: null,
    social: null,
    occupation: null,
    caretaker_image: null,
    caretaker_doc: null
  },
  Adoptor: {
    name: "admin",
    occupation: "jn",
    contact: "osdgdrkp",
    whatsapp: "ion",
    address: "noi",
    pets: true,
    home_type: "on",
    adopter_image: "cloud",
    adopter_doc: "cloud",
    aloneTime:"something",
    caretakerDuringTravel:"with me",
    relocationPlans:"none"
  }
};

const AdoptionForm = () => {
  const [data, setData] = useState(null);
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

  if (!data) {
    return <div>Form not found</div>;
  }

  return (
    <div className="adoptionForm">
      <div className="page">
        <p>Serial Number: _______________ </p>
        <div className="logoContainer">
          <img src="/images/AWH-logo.png" alt="AWH Logo" width="200" />
        </div>
        <h1 className="title">ADOPTION & CONSENT FORM</h1>
        <hr />
        <div className="grid-2 form-1">
          <p>Date: _______________</p> <p>Name of Counselor: ___________________</p>
        </div>
        <Stack gap={"md"}>
          <h2 className="subtitle">Description of Animal</h2>
          <div className="grid-2">
            <div className="image">
              <img src="/images/dog.jpg" alt="Dog" width="200" />
            </div>
            <div className="description">
              <p>Sex: {placeholderData.Animal.gender}</p>
              <p>Age: {placeholderData.Animal.age}</p>
              <p>Breed: {placeholderData.Animal.type}</p>
              <p>Physical Fitness Status: {placeholderData.Animal.fitness}</p>
              <p>Vaccination Status: {placeholderData.Animal.vaccination ? "yes":"no"}</p>
              <p>Sterilization Status: {placeholderData.Animal.sterilisation ? "yes":"no"}</p>
            </div>
          </div>
          <h2 className="subtitle">Details of Caretaker</h2>
          <div className="grid-2">
            <div className="image">
              <div>
                <img src={placeholderData.Animal.photos} alt="Caretaker" width="200" />
                <p className="signature">Date, Signature & Name of Caretaker</p>
              </div>
            </div>
            <div className="description">
              <p>Name of Caretaker: {placeholderData.Caretaker.caretaker}</p>
              <p>Contact No.: {placeholderData.Caretaker.contact}</p>
              <p>WhatsApp No.: {placeholderData.Caretaker.whatsapp}</p>
              <p>Occupation: {placeholderData.Caretaker.occupation}</p>
              <p>Local Residence: {placeholderData.Caretaker.address}</p>
              <p>Instagram/Facebook ID: {placeholderData.Caretaker.social}</p>
            </div>
          </div>
        </Stack>
      </div>

      <div className="page">
        <Stack gap={"md"}>
          <h2 className="subtitle">Details of Adopter</h2>
          <div className="grid-2">
            <div className="image">
              <div>
                <img src={placeholderData.Adoptor.adopter_image} alt="Adopter" width="200" />
                <p className="signature">Date, Signature & Name of Adopter</p>
              </div>
            </div>
            <div className="description">
              <p>Name of Adopter: {placeholderData.Adoptor.name}</p>
              <p>Contact No.: {placeholderData.Adoptor.contact}</p>
              <p>WhatsApp No.: {placeholderData.Adoptor.whatsapp}</p>
              <p>Home Type: {placeholderData.Adoptor.home_type}</p>
              <p>Permanent Residence: {placeholderData.Adoptor.address}</p>
            </div>
          </div>

          <h2 className="subtitle">General Information</h2>
          <List spacing={"md"}>
            <List.Item>
              <p>Have you had a pet before or have one right now?</p>
            </List.Item>
            <List.Item>
              <p>Amount of time your pet may have to be alone in a day? {placeholderData.Adoptor.aloneTime}</p>
            </List.Item>
            <List.Item>
              <p>Who will take care of your pet if you go out of town temporarily? {placeholderData.Adoptor.caretakerDuringTravel}</p>
            </List.Item>
            <List.Item>
              <p>What are your plans for your pet if you shift to another town/place? {placeholderData.Adoptor.relocationPlans}</p>
            </List.Item>
          </List>

          <h2 className="subtitle">Consent</h2>
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
      </div>
      <div className="page">
        <List>
          <List.Item>
            <p>
              Should the responsibility of pet parenting need to be transferred, I will provide advance notice to both the caretaker and Team Animals With Humanity. I understand that the adoption
              process will need to be repeated for the new caretakers, and a fine of Rs. 5,000/- will be duly acknowledged and paid.
            </p>
          </List.Item>
          <List.Item>
            <p>
              I acknowledge that the Animals With Humanity Team possesses the authority to conduct unannounced inspections of the conditions in which I' m taking care for the adopted pet. In the event
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
        <div className="grid-2">
          <div style={{ marginTop: "40px", maxWidth: "200px", margin: "2.5em auto 0 auto" }}>
            <hr />
            <p>
              Adopter's Signature
              <br />
              (with name & date)
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p>
              Documents Attached:
              <br />
              Aadhaar Card of Adopter
            </p>
          </div>
          <div style={{ marginTop: "40px", maxWidth: "200px", margin: "2.5em auto 0 auto" }}>
            <hr />
            <p>
              Caretaker's Signature
              <br />
              (with name & date)
            </p>
          </div>
          <div style={{ marginTop: "40px", maxWidth: "200px", margin: "2.5em auto 0 auto" }}>
            <hr />
            <p>
              Counselor's Signature
              <br />
              (with name & date)
            </p>
          </div>
        </div>
      </div>

      <button onClick={printPage} className="printButton">
        Print
      </button>
    </div>
  );
};

export default AdoptionForm;
