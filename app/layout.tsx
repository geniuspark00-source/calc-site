import './globals.css'

export const metadata = {
  title: "계산기 포털",
  description: "각종 계산 도구를 모아놓은 사이트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        
        {/* 헤더 */}
        <header className="w-full bg-blue-600 text-white shadow-md">
          <div className="max-w-3xl mx-auto px-4 py-4 text-lg font-bold">
            계산기 포털
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
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
