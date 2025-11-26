"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function ExchangeCalculatorUI() {
  const [amountKRW, setAmountKRW] = useState(1000000); // 환전할 원화
  const [rate, setRate] = useState(1350); // 기준 환율
  const [feeRate, setFeeRate] = useState(1.75); // 은행 수수료(스프레드 %)
  const [currency, setCurrency] = useState("USD"); // 통화 종류

  // 실제 적용 환율 = 기준 환율 × (1 + 수수료율%)
  const appliedRate = rate * (1 + feeRate / 100);

  // 받을 외화
  const foreignAmount = amountKRW / appliedRate;

  const format = (n: number, digits = 2) =>
    n.toLocaleString("ko-KR", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6 leading-relaxed">
        은행 환전 수수료(스프레드)를 포함한 실제 환전 금액을 계산합니다.
      </p>

      {/* 입력 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        <Input
          label="환전할 금액 (KRW)"
          value={amountKRW}
          onChange={setAmountKRW}
        />

        <Input
          label="기준 환율 (예: 1 USD = ? KRW)"
          value={rate}
          onChange={setRate}
        />

        <Input
          label="환전 수수료율 (%)"
          value={feeRate}
          onChange={setFeeRate}
        />

        <div>
          <label className="text-sm font-medium">통화 선택</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="USD">USD 미국 달러</option>
            <option value="JPY">JPY 일본 엔</option>
            <option value="EUR">EUR 유로</option>
            <option value="CNY">CNY 중국 위안</option>
          </select>
        </div>
      </div>

      {/* 결과 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4">

        <h2 className="text-lg font-bold text-blue-700">환전 결과</h2>

        <p>
          적용 환율(수수료 포함):{" "}
          <strong className="text-red-600">
            {format(appliedRate, 2)} KRW / {currency}
          </strong>
        </p>

        <p>
          실제 받을 금액:{" "}
          <strong className="text-green-700 text-xl">
            {format(foreignAmount, 2)} {currency}
          </strong>
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 은행마다 스프레드(수수료)는 다르며, 공항 환전소는 더 높을 수 있습니다.
      </p>
    </div>
  );
}
