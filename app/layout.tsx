import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "Animals With humanity | Home",
  description:
    "Animals With Humanity is a registered Non-governmental organization dedicated to rescuing, fostering, and rehoming the abandoned, sick, and injured animals around us. We also take care of their necessities like food, vaccination, sterilization and aware people about it. Alongside this, we take necessary stand for cruelty against voiceless souls.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
