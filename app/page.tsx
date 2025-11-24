"use client";

import Link from "next/link";
import { gtagEvent } from "@/lib/gtag";
import { calculatorCards } from "@/components/calculators/registry";

export default function Home() {
  const handleClick = (href: string, title: string) => {
    const calculatorId = href.replace("/calculators/", "");
    gtagEvent({
      action: "calculator_click",
      category: "calculator",
      label: title,
      calculator_id: calculatorId,
    });
  };

  return (
    <main className="w-full p-4">
      {/* 상단 광고 */}
      <div className="w-full mb-6">
        <div className="w-full h-[120px] bg-gray-100 border rounded-lg flex items-center justify-center text-gray-500">
          광고 자리 (상단)
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">계산기 모음</h1>
        <p className="text-gray-600 mb-8">
          다양한 실생활 계산기를 제공합니다. 원하는 계산기를 아래에서 선택하세요.
        </p>

        {/* 모바일 중간 광고 */}
        <div className="block md:hidden mb-4">
          <div className="w-full h-[150px] bg-gray-100 border rounded-lg flex items-center justify-center text-gray-500">
            광고 자리 (중간)
          </div>
        </div>

        {/* 자동 생성된 계산기 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calculatorCards.map((item) => (
            <Link
              key={item.slug}
              href={`/calculators/${item.slug}`}
              onClick={() => handleClick(`/calculators/${item.slug}`, item.name)}
              className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold text-blue-700">{item.name}</h2>
              <p className="text-gray-600 text-sm">클릭하여 계산기로 이동</p>
            </Link>
          ))}
        </div>

        {/* 하단 광고 */}
        <div className="w-full mt-8">
          <div className="w-full h-[120px] bg-gray-100 border rounded-lg flex items-center justify-center text-gray-500">
            광고 자리 (하단)
          </div>
        </div>
      </div>
    </main>
  );
}
