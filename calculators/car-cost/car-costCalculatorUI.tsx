"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function CarCostCalculatorUI() {
  const [fuelEfficiency, setFuelEfficiency] = useState(12); // km/L
  const [distancePerMonth, setDistancePerMonth] = useState(1000); // 월 주행거리
  const [fuelPrice, setFuelPrice] = useState(1650); // 연료 단가
  const [insurance, setInsurance] = useState(900000); // 연간 보험료
  const [maintenance, setMaintenance] = useState(300000); // 연간 정비비
  const [tax, setTax] = useState(250000); // 연간 자동차세

  // ===== 계산 =====

  // 월 연료비
  const monthlyFuelCost =
    fuelEfficiency > 0
      ? Math.round((distancePerMonth / fuelEfficiency) * fuelPrice)
      : 0;

  // 연료비 × 12
  const yearlyFuelCost = monthlyFuelCost * 12;

  // 총 연간 유지비 = 연료비 + 보험 + 정비 + 자동차세
  const totalYearCost =
    yearlyFuelCost + insurance + maintenance + tax;

  const format = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6 leading-relaxed">
        자동차 유지비는 연료비, 보험료, 정비비, 자동차세 등을 포함해
        계산됩니다.
      </p>

      {/* 입력 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        <Input
          label="연비 (km/L)"
          value={fuelEfficiency}
          onChange={setFuelEfficiency}
        />

        <Input
          label="월 주행거리 (km)"
          value={distancePerMonth}
          onChange={setDistancePerMonth}
        />

        <Input
          label="연료 단가 (원/L)"
          value={fuelPrice}
          onChange={setFuelPrice}
        />

        <Input
          label="연간 보험료 (원)"
          value={insurance}
          onChange={setInsurance}
        />

        <Input
          label="연간 정비비 (원)"
          value={maintenance}
          onChange={setMaintenance}
        />

        <Input
          label="연간 자동차세 (원)"
          value={tax}
          onChange={setTax}
        />
      </div>

      {/* 결과 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
        <h2 className="text-lg font-bold mb-2 text-blue-700">
          자동차 유지비 계산 결과
        </h2>

        <p>
          월 연료비:{" "}
          <strong className="text-green-700">
            {format(monthlyFuelCost)} 원
          </strong>
        </p>

        <p>
          연간 연료비:{" "}
          <strong>{format(yearlyFuelCost)} 원</strong>
        </p>

        <p>
          총 연간 유지비:{" "}
          <strong className="text-red-600 text-lg">
            {format(totalYearCost)} 원
          </strong>
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 이 계산은 평균값 기준이며, 실제 유지비는 차량 상태·운전습관에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
