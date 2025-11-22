"use client";

import { useState } from "react";

export default function CarCostCalculatorUI() {
  // 기본 입력값
  const [fuelPrice, setFuelPrice] = useState(1650); // 리터당 유가(원)
  const [fuelEfficiency, setFuelEfficiency] = useState(11); // km/L
  const [monthlyDistance, setMonthlyDistance] = useState(900); // 월 주행거리
  const [insuranceYearly, setInsuranceYearly] = useState(850000); // 보험료
  const [taxYearly, setTaxYearly] = useState(300000); // 자동차세
  const [maintenanceYearly, setMaintenanceYearly] = useState(400000); // 정비/소모품 비용

  // 계산
  const monthlyFuelUsed = monthlyDistance / fuelEfficiency; // L
  const monthlyFuelCost = monthlyFuelUsed * fuelPrice;

  const yearlyFuelUsed = monthlyFuelUsed * 12;
  const yearlyFuelCost = monthlyFuelCost * 12;

  const totalYearly =
    yearlyFuelCost +
    insuranceYearly +
    taxYearly +
    maintenanceYearly;

  const totalMonthly = totalYearly / 12;

  const format = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6 leading-relaxed">
        유류비, 자동차세, 보험료, 정비비 등을 포함하여
        <br />
        자동차 한 대를 운영하는 데 드는 전체 비용을 계산합니다.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4 mb-6">

        <div>
          <label className="text-sm font-medium">ℓ당 유가(원)</label>
          <input
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">연비(km/L)</label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">월 주행거리(km)</label>
          <input
            type="number"
            value={monthlyDistance}
            onChange={(e) => setMonthlyDistance(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">연간 보험료(원)</label>
          <input
            type="number"
            value={insuranceYearly}
            onChange={(e) => setInsuranceYearly(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">연간 자동차세(원)</label>
          <input
            type="number"
            value={taxYearly}
            onChange={(e) => setTaxYearly(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">연간 정비/소모품 비용(원)</label>
          <input
            type="number"
            value={maintenanceYearly}
            onChange={(e) => setMaintenanceYearly(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">

        <h2 className="text-lg font-bold mb-2 text-blue-700">유류비 계산</h2>

        <p>
          월 연료 소모량: <strong>{monthlyFuelUsed.toFixed(1)} L</strong>
        </p>
        <p>
          월 유류비:
          <strong className="ml-1">{format(Math.round(monthlyFuelCost))} 원</strong>
        </p>

        <h2 className="text-lg font-bold mt-4 mb-2 text-green-700">총 유지비</h2>
        <p>
          연간 자동차 유지비:{" "}
          <strong>{format(Math.round(totalYearly))} 원</strong>
        </p>
        <p className="text-lg font-bold text-red-600">
          월평균 유지비: {format(Math.round(totalMonthly))} 원
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 실제 비용은 차량 종류, 보험 등급, 주행 습관, 정비 주기에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
