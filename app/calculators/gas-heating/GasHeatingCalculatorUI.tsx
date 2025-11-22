"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function GasHeatingCalculatorUI() {
  const [usage, setUsage] = useState(50); // 월 사용량(㎥)
  const [unitPrice, setUnitPrice] = useState(950); // 원/㎥ 단가
  const [baseFee, setBaseFee] = useState(1500); // 기본요금
  const [includeVAT, setIncludeVAT] = useState(true); // 부가세 포함 여부

  // 계산
  const usageCost = usage * unitPrice; // 사용요금
  const subtotal = usageCost + baseFee; // 기본요금 포함
  const vat = includeVAT ? subtotal * 0.1 : 0; // 부가세 10%
  const total = subtotal + vat;

  const format = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6">
        월 사용량과 단가, 기본요금을 입력하면 도시가스 난방비가 계산됩니다.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        <Input
          label="월 사용량 (㎥)"
          value={usage}
          onChange={setUsage}
        />

        <Input
          label="단가 (원/㎥)"
          value={unitPrice}
          onChange={setUnitPrice}
        />

        <Input
          label="기본요금 (원)"
          value={baseFee}
          onChange={setBaseFee}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeVAT}
            onChange={(e) => setIncludeVAT(e.target.checked)}
          />
          <label className="text-sm">부가세 10% 포함</label>
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-2">
        <h2 className="text-lg font-bold text-blue-700">난방비 계산 결과</h2>

        <p>사용요금: <strong>{format(usageCost)} 원</strong></p>
        <p>기본요금: <strong>{format(baseFee)} 원</strong></p>
        <p>부가세: <strong>{format(vat)} 원</strong></p>

        <p className="text-xl font-bold text-red-600 mt-3">
          총 난방비: {format(total)} 원
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4">
        ※ 실제 도시가스 요금은 공급사나 지역에 따라 차이가 있습니다.
      </p>
    </div>
  );
}
