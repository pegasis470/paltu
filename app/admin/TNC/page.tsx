"use client";
import "/public/css/PrintAdoptionForm.css";
import { Center, List, Loader, Stack } from "@mantine/core";
const Terms = () => {
return (<div className="tnc" >
    <Stack gap={"md"}>
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
        </div>
);};
export default Terms;