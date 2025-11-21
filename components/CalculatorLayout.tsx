"use client";

import ResultBox from "@/components/ResultBox";

type Props = {
  title: string;
  desc: string;
  children: React.ReactNode;  // 입력 영역
  result?: React.ReactNode;    // 결과 영역 (옵션)
};

export default function CalculatorLayout({ title, desc, children, result }: Props) {
  return (
    <div className="text-gray-900">
      {/* 뒤로가기 링크 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block font-semibold">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 페이지 제목 */}
      <h1 className="text-2xl font-extrabold mb-3 text-blue-700 tracking-tight">
        {title}
      </h1>

      {/* 설명 글 */}
      <p className="text-gray-700 mb-6 leading-relaxed">
        {desc}
      </p>

      {/* 입력부 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        {children}
      </div>

      {/* 결과부 (옵션) */}
      {result && (
        <ResultBox title="📌 계산 결과">
          {result}
        </ResultBox>
      )}
    </div>
  );
}
