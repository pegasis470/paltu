import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "Paltu By AWH",
  description:
    "Animals With Humanity is a registered Non-governmental organization dedicated to rescuing, fostering, and rehoming the abandoned, sick, and injured animals around us. We also take care of their necessities like food, vaccination, sterilization and aware people about it. Alongside this, we take necessary stand for cruelty against voiceless souls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html style={{height:"100%"}} lang="en">
      <head>
      <link rel="icon" href="/images/paltu logo.png" />
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body style={{height:"100%"}}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
