"use client";

import { useState } from "react";
import { Container, Group, Burger, Box, Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "@/public/images/AWH-logo.png";
import Image from "next/image";
import Link from "next/link";

const links = [
  { link: "https://awhbharat.org", label: "Home" },
  { link: "/about-us", label: "About" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Text c={"white"} fw={"bold"} component={Link} key={link.label} href={link.link} data-active={active === link.link || undefined}>
      {link.label}
    </Text>
  ));

  return (
    <header style={{ height: "0", position: "absolute", top: 0, left: 0, width: "100%", background: "black", zIndex: 50 }}>
      <Box bg={"rgba(0,0,0,0)"} p={"2em"}>
        {/* <Container size="md"> */}
        <Group justify="space-between">
          <Group gap={"lg"}>
            <Burger hiddenFrom="xs" opened={opened} onClick={toggle} size="md" color="white" />
            <Group gap={"lg"} visibleFrom="xs">
              {items}
            </Group>
            <Button color="#03d2ff" variant="filled">
              Donate
            </Button>
          </Group>
          <Box px={"sm"} py={0} bg={"white"} w={"min-content"} style={{ borderRadius: "0 0 10px 10px" }}>
            <Image src={Logo} alt="Logo" height={60} width={108} />
          </Box>
        </Group>
        {/* </Container> */}
      </Box>
    </header>
  );
}
