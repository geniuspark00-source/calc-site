"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function GasHeatingCalculatorUI() {
  const [unit, setUnit] = useState("kwh"); // kwh | m3
  const [usage, setUsage] = useState(0);
  const [region, setRegion] = useState("서울");

  // 지역별 기본 단가 (원/㎥)
  const regionPrice: Record<string, number> = {
    서울: 880,
    경기: 950,
    인천: 900,
    부산: 970,
    대구: 930,
    광주: 940,
    대전: 930,
    울산: 960,
    세종: 920,
    강원: 980,
    충청: 920,
    전라: 910,
    경상: 950,
    제주: 1050,
  };

  const pricePerM3 = regionPrice[region];

  // 정확한 변환: 1 m³ = 10.84 kWh
  const M3_TO_KWH = 10.84;

  // kWh 변환
  const usageKwh = unit === "kwh" ? usage : usage * M3_TO_KWH;

  // 요금 계산 (원/㎥ → 원/kWh 변환 필요 없음. m³ 기준요금으로 직접 계산)
  const usedCost =
    unit === "kwh"
      ? (usageKwh / M3_TO_KWH) * pricePerM3 // kWh → m3 역산 후 가격 적용
      : usage * pricePerM3; // m³ 입력 시 바로 계산

  const vat = usedCost * 0.1;
  const totalCost = usedCost + vat;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-orange-600">
        도시가스 난방비 계산기 
      </h1>

      <p className="text-gray-600 mb-6">
        월 사용량을 kWh 또는 ㎥로 입력하고, 지역별 단가를 반영해
        부가세 포함 난방비를 계산합니다.
      </p>

      {/* 지역 선택 */}
      <div className="space-y-3 bg-white p-4 rounded-lg border shadow-sm">
        <label className="block text-sm font-medium">지역 선택</label>
        <select
          className="w-full border rounded p-2"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {Object.keys(regionPrice).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* 단위 선택 */}
        <label className="block text-sm font-medium mt-2">입력 단위</label>
        <select
          className="w-full border rounded p-2"
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
          { label: "선택 지역", value: region },
          { label: "지역 기본 단가", value: `${pricePerM3} 원/㎥` },
          {
            label: "계산용 환산 사용량",
            value: `${usageKwh.toFixed(1)} kWh`,
          },
          {
            label: "사용요금(부가세 전)",
            value: `${usedCost.toFixed(0)} 원`,
          },
          {
            label: "부가세(10%)",
            value: `${vat.toFixed(0)} 원`,
          },
          {
            label: "총 난방비(부가세 포함)",
            value: `${totalCost.toFixed(0)} 원`,
          },
        ]}
      />
    </div>
  );
}
