"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function CarDepreciationCalculatorUI() {
  const [price, setPrice] = useState(30000000);   // 차량 구입가
  const [years, setYears] = useState(5);          // 보유 기간
  const [annualKm, setAnnualKm] = useState(15000); // 연간 주행거리
  const [fuelEfficiency, setFuelEfficiency] = useState(12); // km/L
  const [fuelPrice, setFuelPrice] = useState(1800); // 유류비
  const [insurance, setInsurance] = useState(900000); // 연 보험료
  const [maintenance, setMaintenance] = useState(500000); // 연 정비비
  const [depreciationRate, setDepreciationRate] = useState(15); // 연 감가율 (%)

  // ===== 감가상각 계산 =====
  const annualDepreciation = price * (depreciationRate / 100);

  // ===== 연유류비 =====
  const annualFuel = (annualKm / fuelEfficiency) * fuelPrice;

  // ===== 총 연간 소유비용 =====
  const totalAnnualCost =
    annualDepreciation + annualFuel + insurance + maintenance;

  // ===== 1km당 유지비 =====
  const costPerKm = totalAnnualCost / annualKm;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-700">
        자동차 감가상각 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        차량 구입가, 감가율, 유류비, 보험료 등을 입력하면 자동차의 실제 연간 소유비용을 계산합니다.
      </p>

      {/* 입력 */}
      <div className="grid gap-4">
        <Input label="차량 구입가(원)" value={price} onChange={setPrice} />
        <Input label="연간 감가율(%)" value={depreciationRate} onChange={setDepreciationRate} />
        <Input label="연간 주행거리(km)" value={annualKm} onChange={setAnnualKm} />
        <Input label="연비(km/L)" value={fuelEfficiency} onChange={setFuelEfficiency} />
        <Input label="유류비(원/L)" value={fuelPrice} onChange={setFuelPrice} />
        <Input label="연 보험료(원)" value={insurance} onChange={setInsurance} />
        <Input label="연 정비비(원)" value={maintenance} onChange={setMaintenance} />
      </div>

      {/* 결과 */}
      <ResultBox
        title="자동차 소유 비용 분석"
        results={[
          { label: "연간 감가상각비", value: `${annualDepreciation.toFixed(0)} 원` },
          { label: "연간 유류비", value: `${annualFuel.toFixed(0)} 원` },
          { label: "연간 보험료", value: `${insurance.toLocaleString()} 원` },
          { label: "연간 정비비", value: `${maintenance.toLocaleString()} 원` },
          { label: "연간 총 소유비용", value: `${totalAnnualCost.toFixed(0)} 원` },
          { label: "1km당 유지비", value: `${costPerKm.toFixed(1)} 원` },
        ]}
      />
    </div>
  );
}
