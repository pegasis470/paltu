import { Box, Container, Flex, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Header } from "./components/header";
import {Footer} from "./components/footer"
import { MainCarousel } from "./components/mainCarousel";
import { StatsGroup } from "./components/stats";
import WorkCards from "./components/workCardItem";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <Stack gap={0} p={0} m={0}>
        <Box w={"100%"} h={"60vh"} pos={"relative"}>
          <MainCarousel />
        </Box>
        <Title style={{color: "white",padding: "10px",background:"#03d2ff"}}>
          Our Wings...
          </Title>
        <Box w={"100%"} h={"50vh"} pos={"relative"}><a href="/paltu">
        <Image fill src="/images/AWH-wings .png"  alt=""/></a>
        </Box>
        <Box bg={"#fff500"}>
          <Container>
            <StatsGroup />
          </Container>
        </Box>
        <Box bg={"#fff500"}>
          <Box bg={"blue.4"} style={{ borderRadius: "0 100px 100px 0" }} py={"3em"}>
            <Container>
              <Title my={"lg"} order={2} size={"3rem"} c={"#fff500"}>
                Our Work
              </Title>
              <WorkCards />
            </Container>
          </Box>
          <Flex mt={"2em"} gap={"1em"} align={"end"} justify={"space-between"} px={"xl"}>
            <div>
              <Title order={1} size={"5rem"} c={"blue.4"}>
                EVENTS
              </Title>
              <Title order={1} size={"5rem"} c={"blue.4"}>
                AND
              </Title>
            </div>
            <Text size={"1.5em"} c={"blue.7"}>
              We host diverse events and campaigns to engage with <br /> those unfamiliar with our cause. These initiatives aid in raising awareness, especially among young minds,
            </Text>
          </Flex>
          <Box bg={"blue.4"} pb={"3em"}>
            <Flex gap={"1em"} align={"start"} justify={"space-between"} px={"xl"}>
              <Title order={1} size={"5rem"} c={"#fff500"}>
                CAMPAIGNS
              </Title>
              <Text size={"1.5em"} c={"white"}>
                We host diverse events and campaigns to engage with <br /> those unfamiliar with our cause. These initiatives aid in raising awareness, especially among young minds,
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box w={"100%"} h={"100vh"} pos={"relative"}>
          <Box w={"100%"} h={"100%"} pos={"absolute"} top={0} left={0} style={{ zIndex: -1, borderRadius: "0 0 200px 0" }}>
            <Image
              src={"/images/team-2.jpg"}
              alt="Background"
              layout="fill"
              objectFit="cover"
              style={{
                filter: "brightness(40%)", // Darkens the image
                zIndex: -1, // Ensure the image is behind other content
                borderRadius: "0 0 200px 0",
              }}
            />
          </Box>
          <Flex gap={"1em"} h={"80vh"} align={"center"} justify={"space-between"} px={"xl"}>
            <Title order={1} size={"5rem"} c={"#fff500"}>
              Why Should You <br /> Join Us?
            </Title>
            <Text size={"lg"} c={"white"}>
              Reasons to join us are many, but the most important one is to make a difference in the lives of animals. We are a team of passionate individuals who are dedicated to the welfare of
            </Text>
          </Flex>
          </Box>
  {/* Footer image container */}
  <Footer />
      </Stack>
    </>
  );
}
