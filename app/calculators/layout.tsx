"use client";

import { generateSEOTags } from "@/lib/seo";
import { gtagEvent } from "@/lib/gtag";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const metadata = generateSEOTags({
  title: "실생활 계산기 모음 | Calc Site",
  description:
    "전세 → 월세 전환 계산기, 임대 수익률 계산기 등 다양한 생활 계산기를 제공합니다.",
  url: "https://calc-site-delta.vercel.app",
});

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⭐ 현재 경로
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const calculatorId = pathname.replace("/calculators/", "");

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
      {/* 왼쪽 광고 */}
      <aside className="hidden md:flex flex-col mr-4 sticky top-4">
        <div className="w-[160px] h-[600px] bg-gray-200 border rounded-lg flex items-center justify-center text-gray-600">
          광고
        </div>
      </aside>

      {/* 계산기 본문 */}
      <section className="w-full max-w-2xl">{children}</section>

      {/* 오른쪽 광고 */}
      <aside className="hidden md:flex flex-col ml-4 sticky top-4">
        <div className="w-[160px] h-[600px] bg-gray-200 border rounded-lg flex items-center justify-center text-gray-600">
          광고
        </div>
      </aside>
    </div>
  );
}
