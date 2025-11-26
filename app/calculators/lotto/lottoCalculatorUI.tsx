"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function LottoCalculatorUI() {
  const [prize, setPrize] = useState(1000000000); // 기본 10억

  const base = 500000000; // 5억
  const taxLow = 0.22;     // 5억 이하 세율
  const taxHigh = 0.33;    // 5억 초과 세율

  let taxAmount = 0;

  if (prize <= base) {
    taxAmount = prize * taxLow;
  } else {
    taxAmount = base * taxLow + (prize - base) * taxHigh;
  }

  const realAmount = prize - taxAmount;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-700">
        로또 실수령액 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        로또 당첨금에서 세금(5억 이하 22%, 초과 33%)을 제외한 실제 수령액을 계산합니다.
      </p>

      {/* 입력 */}
      <div className="grid gap-4">
        <Input label="당첨금(원)" value={prize} onChange={setPrize} />
      </div>

      {/* 결과 */}
      <ResultBox
        title="계산 결과"
        results={[
          { label: "총 세금", value: `${taxAmount.toFixed(0)} 원` },
          { label: "실수령액", value: `${realAmount.toFixed(0)} 원` },
        ]}
      />
    </div>
  );
}
