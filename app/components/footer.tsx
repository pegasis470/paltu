import { Box,Stack, Title } from "@mantine/core";
import Image from "next/image";

export function Footer() {
return (
    <Box w={"100%"} h={"80vh"} pos={"relative"}>
    <Box w={"100%"} h={"100%"} pos={"relative"} zIndex={1}>
    <Image
      src={"/images/footer.png"}
      alt={""}
      layout="fill"
      objectFit="cover"
      style={{
        zIndex: 1, // Ensure the image is above the background color
      }}
    />
  </Box>

  {/* Title container */}
  <Box w={"100%"} h={"10%"} pos={"relative"} bg="#fff500">
    <Stack h={"40%"} gap={"1em"} align={"center"} justify={"center"} px={"xl"}>
      <Title order={1} size={"2rem"} c={"black"} fs={"italic"}>
        IT'S TIME TO QUESTION - "ARE YOU A HOOOMAN"?
      </Title>
    </Stack>
  </Box>
</Box>

)
}
