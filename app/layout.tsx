// === 사이트 공통 메타데이터(SEO) ===
export const metadata = {
  title: "실생활 계산기 모음 | Calc Site",
  description:
    "전세 → 월세 전환 계산기, 임대 수익률 계산기, 연봉 실수령액 계산기 등 다양한 실생활 계산기를 제공합니다.",
  keywords: [
    "계산기",
    "전세 계산기",
    "월세 계산기",
    "임대 수익률",
    "부동산 계산기",
    "연봉 실수령액",
    "생활 계산기",
    "대출 계산기",
    "유튜브 수익 계산기",
  ],
  openGraph: {
    title: "실생활 계산기 모음 | Calc Site",
    description:
      "임대 수익률, 연봉 실수령액, 대출 상환, 유튜브 수익 등 다양한 실생활 계산기를 제공합니다.",
    url: "https://calc-site-delta.vercel.app",
    siteName: "Calc Site",
    images: [
      {
        url: "https://dummyimage.com/1200x630/0a4cff/ffffff&text=Calc+Site",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 🔥 네이버 웹마스터 인증 */}
        <meta
          name="naver-site-verification"
          content="4a30cccf3155a14557a50753283804df1e4a5524"
        />

        {/* 🔥 네이버 애널리틱스 */}
        <Script async src="//wcs.pstatic.net/wcslog.js" />
        <Script
          id="naver-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              if (!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "16e52379c8f2ae0";
              if (window.wcs) { wcs_do(); }
            `,
          }}
        />

        {/* 🔥 구글 애드센스 전역 스크립트 (1단계 완료) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8697754621674017"
          crossOrigin="anonymous"
        />

        {/* 🔥 Google Analytics GA4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-69VTBW89SF"
        />
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-69VTBW89SF', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>

      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
        {/* 헤더 */}
        <header className="w-full bg-blue-600 text-white shadow-md">
          <div className="w-full max-w-5xl mx-auto px-4 py-4 text-lg font-bold">
            계산기 포털
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 w-full px-4 py-6">{children}</main>

        {/* 푸터 */}
        <footer className="w-full bg-white border-t py-6 text-center text-sm text-gray-500">
          © 2025 계산기 포털. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
