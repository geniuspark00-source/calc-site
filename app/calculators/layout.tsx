import "../../globals.css";
import Script from "next/script";

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 기본 GA4 스크립트 (변경 없음) */}
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

      {/* 전체 계산기 페이지 공통 UI 컨테이너 */}
      <div
        className="
          w-full 
          px-4 py-6 
          md:px-6 md:py-10 
          max-w-3xl mx-auto 
          space-y-8
        "
      >
        {children}
      </div>
    </>
  );
}
