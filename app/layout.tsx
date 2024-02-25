import "@mantine/core/styles.css";
import React from "react";
import "@mantine/notifications/styles.css";
import { MantineProvider, ColorSchemeScript, Notification } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "product summarizer",
  description: "summarize any product",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Notifications/>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
