"use client";

import { gtagEvent } from "@/lib/gtag";
import { usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function CalculatorsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname(); // ex) "/calculators/rent-yield"

  useEffect(() => {
    if (!pathname?.startsWith("/calculators/")) return;

    // "/calculators/" 뒤의 슬러그만 추출
    const calculatorId = pathname
      .replace("/calculators/", "")
      .replace(/\/$/, ""); // 혹시 마지막에 / 있으면 제거

    if (!calculatorId) return;

    // 라벨용 예쁜 타이틀 (rent-yield -> Rent Yield)
    const title = calculatorId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    gtagEvent({
      action: "calculator_view",
      category: "calculator",
      label: title,
      calculator_id: calculatorId,
    });
  }, [pathname]);

  return (
    <div className="w-full p-4 flex justify-center">
      {/* 왼쪽 광고 (PC 전용) */}
      <aside className="hidden md:flex flex-col mr-4 sticky top-4">
        <div className="w-[160px] h-[600px] bg-gray-200 border rounded-lg flex items-center justify-center text-gray-600">
          광고
        </div>
      </aside>

      {/* 계산기 본문 */}
      <section className="w-full max-w-2xl">{children}</section>

      {/* 오른쪽 광고 (PC 전용) */}
      <aside className="hidden md:flex flex-col ml-4 sticky top-4">
        <div className="w-[160px] h-[600px] bg-gray-200 border rounded-lg flex items-center justify-center text-gray-600">
          광고
        </div>
      </aside>
    </div>
  );
}
