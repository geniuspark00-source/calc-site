"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface AdsenseProps {
  slot: string;
}

export default function Adsense({ slot }: AdsenseProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", margin: "16px 0" }}
      data-ad-client="ca-pub-8697754621674017"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
