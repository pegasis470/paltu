import { Box, Container, Stack } from "@mantine/core";
import { Header } from "./components/header";
import { MainCarousel } from "./components/mainCarousel";
import { StatsGroup } from "./components/stats";

export default function Home() {
  return (
    <>
      <Header />
      <Stack gap={0} p={0} m={0}>
        <Box w={"100%"} h={"100vh"} pos={"relative"}>
          <MainCarousel />
        </Box>
        <Box bg={"yellow.4"}>
          <Container mih={"100vh"}>
            <StatsGroup />
          </Container>
        </Box>
      </Stack>
    </>
  );
}
