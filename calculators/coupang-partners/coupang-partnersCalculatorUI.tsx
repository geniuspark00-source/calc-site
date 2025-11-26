"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function CoupangPartnersCalculatorUI() {
  // 입력값 상태
  const [clicks, setClicks] = useState(5000); // 월 클릭 수
  const [conversionRate, setConversionRate] = useState(5); // 전환율(%)
  const [avgOrderAmount, setAvgOrderAmount] = useState(45000); // 1회 주문당 금액
  const [commissionRate, setCommissionRate] = useState(3); // 수수료율(%)

  // 안전 값
  const safeClicks = Math.max(0, clicks);
  const cr = Math.max(0, conversionRate) / 100;
  const fee = Math.max(0, commissionRate) / 100;

  // 계산
  const orders = safeClicks * cr; // 월 예상 주문 건수
  const grossSales = orders * avgOrderAmount; // 월 총 매출
  const revenue = grossSales * fee; // 월 수익

  const rpm = safeClicks > 0 ? revenue / safeClicks : 0; // 클릭당 수익
  const perThousand = rpm * 1000; // 1000클릭당 수익

  const format = (n: number, digits = 0) =>
    isNaN(n)
      ? "-"
      : n.toLocaleString("ko-KR", {
          maximumFractionDigits: digits,
        });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6 leading-relaxed">
        쿠팡 파트너스 수익은 클릭 수, 전환율, 객단가, 수수료율에 따라 정해집니다.
        <br />
        아래 값을 입력해 예상 수익을 계산해보세요.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        <Input
          label="월 클릭 수 (회)"
          value={clicks}
          onChange={setClicks}
        />

        <Input
          label="전환율 (%)"
          value={conversionRate}
          onChange={setConversionRate}
        />

        <Input
          label="1회 주문당 결제 금액 (원)"
          value={avgOrderAmount}
          onChange={setAvgOrderAmount}
        />

        <Input
          label="수수료율 (%)"
          value={commissionRate}
          onChange={setCommissionRate}
        />
      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3 mb-4">
        <h2 className="text-lg font-bold mb-2 text-blue-700">
          예상 수익 결과
        </h2>

        <p>
          월 예상 주문 건수:{" "}
          <strong>{format(orders, 1)} 건</strong>
        </p>

        <p>
          월 예상 총 매출:{" "}
          <strong>{format(Math.round(grossSales))} 원</strong>
        </p>

        <p className="mt-2">
          쿠팡 파트너스 예상 수익(월):{" "}
          <strong className="text-green-700 text-lg">
            {format(Math.round(revenue))} 원
          </strong>
        </p>

        <p className="mt-2 text-sm text-gray-700">
          클릭 1회당 수익:{" "}
          <strong>{format(rpm, 2)} 원</strong>{" "}
          / 1,000클릭당 수익:{" "}
          <strong>{format(Math.round(perThousand))} 원</strong>
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 실제 수익은 카테고리 수수료율, 취소·반품, 부가세 등에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
