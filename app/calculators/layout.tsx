import "../globals.css";
import Script from "next/script";
import Adsense from "@/components/Adsense";

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 기본 GA4 스크립트 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SP8Y2KDTGQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SP8Y2KDTGQ');
        `}
      </Script>

      {/* 계산기 공통 컨테이너 */}
      <div
        className="
          w-full 
          px-4 py-6 
          md:px-6 md:py-10 
          max-w-3xl mx-auto 
          space-y-8
        "
      >
        {/* 🔥 상단 광고 */}
        <Adsense slot="6604237680" />

        {children}

        {/* 🔥 하단 광고 */}
        <Adsense slot="6604237680" />
      </div>
    </>
  );
}
