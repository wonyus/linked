// "use client";
import getConfig from "next/config";
import React, { Suspense } from "react";

const config = getConfig();

const Footer = () => {
  return (
    <footer>
      <Suspense>© 2024 Linked {config?.publicRuntimeConfig?.version}</Suspense>
    </footer>
  );
};

export default Footer;
