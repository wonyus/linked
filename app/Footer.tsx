// "use client";
import React, { Suspense } from "react";
import getConfig from "next/config";

const config = getConfig();

const Footer = () => {
  return (
    <footer>
      <Suspense>© 2024 Linked {config?.publicRuntimeConfig?.version}</Suspense>
    </footer>
  );
};

export default Footer;
