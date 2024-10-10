"use client";
import { Card, Image, SimpleGrid, Text } from "@mantine/core";

const workItems = [
  {
    title: "Legal",
    description: "We address and help in cases of animal cruelty through legal means.",
    image: "/icons/work/icon1.png",
  },
  {
    title: "Animal Rescue",
    description: "We intervene to rescue animals in distress that are living on the streets.",
    image: "/icons/work/icon2.png",
  },
  {
    title: "Fostering and Adoption",
    description: "We offer a temporary shelter for distressed animals during their recovery period and work towards securing permanent homes for them.",
    image: "/icons/work/icon3.png",
  },
  {
    title: "Vaccination",
    description: "We provide free rabies vaccination and vaccinations for other diseases at affordable cost in companion animals.",
    image: "/icons/work/icon4.png",
  },
  {
    title: "Awareness & Bonding",
    description: "We arrange public awareness programs to promote understanding of the coexistence challenges between humans and animals, focusing on their welfare.",
    image: "/icons/work/icon5.png",
  },
  {
    title: "Sterilisation",
    description: "We collaborate with local administrative bodies to facilitate the sterilization of community dogs and cats.",
    image: "/icons/work/icon6.png",
  },
];

export default function WorkCards() {
  const cards = workItems.map((item, index) => (
    <Card shadow="md" radius={"lg"} padding="xl" maw={"300px"} bg={"blue.3"} key={index} mx={"auto"}>
      <Card.Section pt={"lg"} px={"lg"}>
        <Image src={item.image} h={150} w={150} alt="No way!" />
      </Card.Section>

      <Text fw={700} c={"white"} size="2em" mt="md">
        {item.title}
      </Text>

      <Text mt="xs" c="white" size="sm">
        {item.description}
      </Text>
    </Card>
  ));

  return <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>{cards}</SimpleGrid>;
}
