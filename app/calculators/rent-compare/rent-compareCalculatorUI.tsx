"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function RentCompareCalculatorUI() {
  const [jeonse, setJeonse] = useState(200000000); // 전세금
  const [deposit, setDeposit] = useState(10000000); // 월세 보증금
  const [monthlyRent, setMonthlyRent] = useState(600000); // 월세 금액
  const [rate, setRate] = useState(4.5); // 전월세 전환율 (%)

  // ===== 계산 =====

  // 전세 → 월세 상당액
  const jeonseToWolse = (jeonse * (rate / 100)) / 12;

  // 월세 → 전세 상당액
  const wolseToJeonse = deposit + (monthlyRent * 12) / (rate / 100);

  const format = (n: number) =>
    n.toLocaleString("ko-KR", {
      maximumFractionDigits: 0,
    });

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6 leading-relaxed">
        전월세 전환율을 기준으로 전세금 대비 월세 상당액과
        <br />
        월세 조건 대비 적정 전세금을 계산합니다.
      </p>

      {/* 입력 박스 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        <Input
          label="전세금 (원)"
          value={jeonse}
          onChange={setJeonse}
        />

        <Input
          label="월세 보증금 (원)"
          value={deposit}
          onChange={setDeposit}
        />

        <Input
          label="월세 금액 (원)"
          value={monthlyRent}
          onChange={setMonthlyRent}
        />

        <Input
          label="전월세 전환율 (%)"
          value={rate}
          onChange={setRate}
        />
      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4">

        <h2 className="text-lg font-bold text-blue-700">
          전월세 전환 계산 결과
        </h2>

        <p>
          전세금 기준 월세 상당액:{" "}
          <strong className="text-green-700">
            {format(Math.round(jeonseToWolse))} 원
          </strong>
        </p>

        <p>
          월세 조건을 전세로 바꾼다면 적정 전세금:{" "}
          <strong className="text-red-600">
            {format(Math.round(wolseToJeonse))} 원
          </strong>
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 전월세 전환율은 법적 기준 및 계약 조건에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
