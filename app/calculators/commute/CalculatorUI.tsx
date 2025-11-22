"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function CalculatorUI() {
  const [distance, setDistance] = useState(10); // 편도 km
  const [speed, setSpeed] = useState(40); // km/h
  const [fuelCost, setFuelCost] = useState(1800); // 리터당 가격
  const [efficiency, setEfficiency] = useState(12); // km/L
  const [altCost, setAltCost] = useState(0); // 대중교통 비용

  // ===== 시간 계산 =====
  const commuteTimeOneWay = distance / speed; // 시간(h)
  const commuteTimeDaily = commuteTimeOneWay * 2;
  const commuteTimeMonthly = commuteTimeDaily * 22;
  const commuteTimeYearly = commuteTimeDaily * 264;

  // ===== 자동차 비용 =====
  const fuelUsedOneWay = distance / efficiency;
  const fuelCostOneWay = fuelUsedOneWay * fuelCost;

  const fuelCostDaily = fuelCostOneWay * 2;
  const fuelCostMonthly = fuelCostDaily * 22;
  const fuelCostYearly = fuelCostDaily * 264;

  // ===== 대중교통 비용 =====
  const altDaily = altCost > 0 ? altCost * 2 : 0;
  const altMonthly = altDaily * 22;
  const altYearly = altDaily * 264;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">출퇴근 시간·비용 계산기</h1>

      {/* 입력 */}
      <div className="grid gap-4">
        <Input label="편도 거리 (km)" value={distance} onChange={setDistance} />
        <Input label="평균 속도 (km/h)" value={speed} onChange={setSpeed} />
        <Input label="유류비 (1L)" value={fuelCost} onChange={setFuelCost} />
        <Input label="연비 (km/L)" value={efficiency} onChange={setEfficiency} />
        <Input
          label="대중교통 1회 비용 (선택)"
          value={altCost}
          onChange={setAltCost}
        />
      </div>

      {/* 결과: 출퇴근 시간 */}
      <ResultBox
        title="출퇴근 시간"
        results={[
          {
            label: "하루",
            value: `${(commuteTimeDaily * 60).toFixed(0)} 분`,
          },
          {
            label: "월(22일)",
            value: `${commuteTimeMonthly.toFixed(1)} 시간`,
          },
          {
            label: "연(264일)",
            value: `${commuteTimeYearly.toFixed(1)} 시간`,
          },
        ]}
      />

      {/* 자동차 비용 */}
      <ResultBox
        title="자동차 출퇴근 비용"
        results={[
          { label: "하루", value: `${fuelCostDaily.toFixed(0)} 원` },
          { label: "월(22일)", value: `${fuelCostMonthly.toFixed(0)} 원` },
          { label: "연(264일)", value: `${fuelCostYearly.toFixed(0)} 원` },
        ]}
      />

      {/* 대중교통 비용 (입력했을 때만 표시) */}
      {altCost > 0 && (
        <ResultBox
          title="대중교통 출퇴근 비용"
          results={[
            { label: "하루", value: `${altDaily.toFixed(0)} 원` },
            { label: "월(22일)", value: `${altMonthly.toFixed(0)} 원` },
            { label: "연(264일)", value: `${altYearly.toFixed(0)} 원` },
          ]}
        />
      )}
    </div>
  );
}
