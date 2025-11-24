"use client";

import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";
import { useState } from "react";

export default function TestCalcCalculatorUI() {
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [rate, setRate] = useState(0);

  // TODO: 여기서 이 계산기에 맞는 로직을 구현하세요.
  // 예: 금액/기간/이율 기반 계산

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 mb-2">test calc 계산기</h1>

      <Input
        label="금액(원)"
        value={amount}
        onChange={setAmount}
        placeholder="예: 1,000,000"
      />

      <Input
        label="기간(개월)"
        value={period}
        onChange={setPeriod}
        placeholder="예: 12"
      />

      <Input
        label="이율(%)"
        value={rate}
        onChange={setRate}
        placeholder="예: 5"
      />

      <ResultBox
        title="계산 결과"
        results={[
          { label: "총 금액", value: "0 원", highlight: true },
          { label: "월 금액", value: "0 원" },
          { label: "기타 지표", value: "0" },
        ]}
      />
    </div>
  );
}
