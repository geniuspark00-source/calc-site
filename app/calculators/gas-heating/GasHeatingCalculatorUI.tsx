"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function GasHeatingCalculatorUI() {
  const [unit, setUnit] = useState("kwh"); // kwh | m3
  const [usage, setUsage] = useState(0); // 입력값 (단위에 따라 의미 다름)

  // m3 → kWh 변환
  const M3_TO_KWH = 11.6;

  // 실제 계산용 kWh
  const usageKwh = unit === "kwh" ? usage : usage * M3_TO_KWH;

  // === 요금 계산 ===
  const basicFee = 1140; // 기본요금
  const rate = 15.24; // kWh당 도시가스 단가 (예시)

  const totalCost = basicFee + usageKwh * rate;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-orange-600">
        도시가스 난방비 계산기 (업그레이드)
      </h1>

      <p className="text-gray-600 mb-6">
        월 사용량을 kWh 또는 ㎥(세제곱미터)로 입력해 실제 난방비를 계산합니다.
      </p>

      {/* 단위 선택 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">입력 단위 선택</label>

        <select
          className="w-full border p-2 rounded"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="kwh">kWh로 입력</option>
          <option value="m3">㎥(세제곱미터)로 입력</option>
        </select>

        <Input
          label={unit === "kwh" ? "월 사용량 (kWh)" : "월 사용량 (㎥)"}
          value={usage}
          onChange={setUsage}
        />
      </div>

      {/* 결과 */}
      <ResultBox
        title="도시가스 요금 계산 결과"
        results={[
          {
            label: "실제 계산용 사용량 (kWh)",
            value: `${usageKwh.toFixed(1)} kWh`,
          },
          {
            label: "기본요금",
            value: `${basicFee} 원`,
          },
          {
            label: "총 난방비",
            value: `${totalCost.toFixed(0)} 원`,
          },
        ]}
      />
    </div>
  );
}
