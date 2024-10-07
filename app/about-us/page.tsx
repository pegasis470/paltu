import { Avatar, Box, Card, Container, Divider, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { Header } from "@/app/components/header";
import Image from "next/image";
import { Carousel, CarouselSlide } from "@mantine/carousel";

export default function AboutUs() {
  return (
    <>
      <Header />
      <Stack gap={0} p={0} m={0}>
        <Box w={"100%"} h={"100vh"} pos={"relative"}>
          <Box w={"100%"} h={"100%"} pos={"absolute"} top={0} left={0} style={{ zIndex: -1 }}>
            <Image
              src={"/images/team.png"}
              alt="Background"
              layout="fill"
              objectFit="cover"
              style={{
                filter: "brightness(40%)", // Darkens the image
                zIndex: -1, // Ensure the image is behind other content
              }}
            />
          </Box>
          <Container h={"100%"} w={"100%"}>
            <Stack h={"100%"} justify="center" gap={"xl"}>
              <Group justify="center" wrap="wrap" gap={"lg"}>
                <Box>
                  <Title c={"white"} fz={{ base: "3rem", md: "4rem" }}>
                    Who are
                  </Title>
                  <Title c={"yellow.3"} fz={{ base: "3rem", md: "6rem" }} mt={"-1rem"}>
                    We
                  </Title>
                </Box>
                <Text c={"white"} fz={{ base: "0.75rem", sm: "1.15rem", md: "1.5rem" }} maw={"600px"}>
                  Team Animals With Humanity is a registered Non-governmental organization dedicated to rescuing, fostering, and rehoming the abandoned, sick, and injured animals around us. We also
                  take care of their necessities like food, vaccination, sterilization and aware people about it. Alongside this, we take necessary stand for cruelty against voiceless souls.
                </Text>
                <Card bg={"yellow.3"} radius={"lg"}>
                  <Title c={"blue.5"} fz={{ base: "1.5rem", sm: "2rem" }} mb={"0.25em"}>
                    Our Mission
                  </Title>
                  <Text fz={{ base: "1rem", sm: "1.5rem" }} maw={"600px"} fw={"bold"}>
                    दयालुः भवतु, सर्वविधाय। (Let's be kind, to all kinds)
                  </Text>
                  <Text fz={{ base: "1rem", sm: "1.5rem" }} maw={"600px"} fw={"bold"}>
                    our Mission is to create a world, where Animals & Humans can co-exist peacefully
                  </Text>
                </Card>
              </Group>
            </Stack>
          </Container>
        </Box>
        <Box w={"100%"} h={"100vh"} pos={"relative"}>
          <Box w={"100%"} h={"100%"} pos={"absolute"} top={0} left={0} style={{ zIndex: -1 }}>
            <Image
              src={"/images/team-2.jpg"}
              alt="Background"
              layout="fill"
              objectFit="cover"
              style={{
                filter: "brightness(40%)", // Darkens the image
                zIndex: -1, // Ensure the image is behind other content
              }}
            />
          </Box>
          <Container h={"100%"} w={"100%"}>
            <Stack h={"100%"} justify="center" align="start">
              <Card bg={"blue.5"} p={"sm"} w={"fit-content"}>
                <Title c={"yellow.4"} fz={{ base: "1.5rem", sm: "2rem" }}>
                  Faces Behind AWH
                </Title>
              </Card>
              <Box h={{ base: "500px", md: "400px" }} style={{ display: "flex", alignItems: "center" }}>
                <Carousel withIndicators height="100%" style={{ flex: 1 }} loop slideGap="md">
                  <CarouselSlide>
                    <Card w={"100%"} bg={"yellow.3"} radius={"lg"} p={"sm"} style={{ cursor: "pointer" }}>
                      <Flex align={"center"} justify={"space-evenly"} wrap={"wrap"} gap={"md"}>
                        <Stack gap={"md"} justify="center" align="center">
                          <Avatar size={"140px"} alt="Team Member" />
                          <Stack justify="center" align="center" gap={0}>
                            <Text fz={"1.15rem"} fw={"bold"}>
                              Member Name
                            </Text>
                            <Text c={"gray.8"} fz={"1rem"} fw={"bold"}>
                              Position in AWH
                            </Text>
                          </Stack>
                        </Stack>
                        <Text c={"black"} fz={"1rem"} fw={"bold"} maw={"600px"}>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, sapiente consectetur! Sit saepe neque consequatur sed accusantium officiis voluptates dignissimos repudiandae.
                          Molestiae libero perferendis consectetur nisi ratione quas tempora assumenda?
                        </Text>
                      </Flex>
                    </Card>
                  </CarouselSlide>
                  <CarouselSlide>
                    <Card w={"100%"} bg={"yellow.3"} radius={"lg"} p={"sm"} style={{ cursor: "pointer" }}>
                      <Flex align={"center"} justify={"space-evenly"} wrap={"wrap"} gap={"md"}>
                        <Stack gap={"md"} justify="center" align="center">
                          <Avatar size={"140px"} alt="Team Member" />
                          <Stack justify="center" align="center" gap={0}>
                            <Text fz={"1.15rem"} fw={"bold"}>
                              Member Name
                            </Text>
                            <Text c={"gray.8"} fz={"1rem"} fw={"bold"}>
                              Position in AWH
                            </Text>
                          </Stack>
                        </Stack>
                        <Text c={"black"} fz={"1rem"} fw={"bold"} maw={"600px"}>
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, sapiente consectetur! Sit saepe neque consequatur sed accusantium officiis voluptates dignissimos repudiandae.
                          Molestiae libero perferendis consectetur nisi ratione quas tempora assumenda?
                        </Text>
                      </Flex>
                    </Card>
                  </CarouselSlide>
                </Carousel>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Stack>
    </>
  );
}
