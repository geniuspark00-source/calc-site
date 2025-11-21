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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">

      {/* 🔥 네이버 웹마스터 태그 (정확한 값) */}
      <head>
        <meta
          name="naver-site-verification"
          content="4a30cccf3155a14557a50753283804df1e4a5524"
        />
      </head>

      {/* 🔥 scroll 문제 해결된 body */}
      <body className="bg-gray-50 text-gray-900 flex flex-col overflow-y-auto">

        {/* 헤더 */}
        <header className="w-full bg-blue-600 text-white shadow-md">
          <div className="max-w-3xl mx-auto px-4 py-4 text-lg font-bold">
            계산기 포털
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
          {children}
        </main>

        {/* 푸터 */}
        <footer className="w-full bg-white border-t py-6 text-center text-sm text-gray-500">
          © 2025 계산기 포털. All rights reserved.
        </footer>

      </body>
    </html>
  );
}
