"use client";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode; // 입력 영역
  result?: React.ReactNode; // 결과 영역 (옵션)
};

export default function CalculatorLayout({
  title,
  description,
  children,
  result,
}: Props) {
  return (
    <div>
      {/* 돌아가기 링크 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{title}</h1>

      {/* 설명 */}
      <p className="text-gray-600 mb-6">{description}</p>

      {/* 입력 박스 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        {children}
      </div>

      {/* 결과 박스 */}
      {result && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border">{result}</div>
      )}
    </div>
  );
}
