"use client";
import { useEffect } from "react";

type ThirdPartyScriptProps = {
  src: string;
  attributes?: Record<string, string>;
};

export default function ThirdPartyScript({
  src,
  attributes = {},
}: ThirdPartyScriptProps) {
  useEffect(() => {
    // Check if the script already exists
    if (document.querySelector(`script[src="${src}"]`)) return;

    // Dynamically create the script
    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    // Add any additional attributes
    Object.entries(attributes).forEach(([key, value]) =>
      script.setAttribute(key, value)
    );

    document.body.appendChild(script);

    return () => {
      // Cleanup the script on unmount
      document.body.removeChild(script);
    };
  }, [src, attributes]);

  return null;
}
