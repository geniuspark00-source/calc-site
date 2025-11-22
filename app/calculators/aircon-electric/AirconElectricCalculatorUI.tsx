"use client";

import { useState, useEffect } from "react";

type AirconType = "wall" | "stand" | "twoinone";

const AIRCON_PRESET: Record<AirconType, { label: string; power: number }> = {
  wall: { label: "벽걸이 에어컨", power: 900 },
  stand: { label: "스탠드 에어컨", power: 1800 },
  twoinone: { label: "2in1 에어컨", power: 2600 },
};

export default function AirconElectricCalculatorUI() {
  const [type, setType] = useState<AirconType>("wall");
  const [power, setPower] = useState<number>(AIRCON_PRESET["wall"].power);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [days, setDays] = useState<number>(30);
  const [kwhPrice, setKwhPrice] = useState<number>(140); // kWh 단가(원)

  // 에어컨 종류 변경 시 전력 자동 업데이트
  useEffect(() => {
    setPower(AIRCON_PRESET[type].power);
  }, [type]);

  const dailyKwh = (power * hoursPerDay) / 1000; // 하루 사용량
  const monthlyKwh = dailyKwh * days; // 월 사용량
  const dailyCost = dailyKwh * kwhPrice;
  const monthlyCost = monthlyKwh * kwhPrice;

  const formatNumber = (n: number) =>
    isNaN(n)
      ? "-"
      : n.toLocaleString("ko-KR", {
          maximumFractionDigits: 0,
        });

  const formatNumberFloat = (n: number) =>
    isNaN(n)
      ? "-"
      : n.toLocaleString("ko-KR", {
          maximumFractionDigits: 1,
        });

  return (
    <div className="space-y-6">

      {/* 입력 영역 */}
      <div className="grid gap-4 bg-white p-4 rounded-lg shadow-sm">
        
        {/* 에어컨 종류 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">에어컨 종류</label>
          <select
            className="border rounded-md px-3 py-2 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value as AirconType)}
          >
            {Object.entries(AIRCON_PRESET).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label} (평균 {item.power}W)
              </option>
            ))}
          </select>
        </div>

        {/* 하루 사용시간 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">하루 사용시간 (시간)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={hoursPerDay || ""}
            onChange={(e) => setHoursPerDay(Number(e.target.value) || 0)}
            placeholder="예: 8"
          />
        </div>

        {/* 사용 일수 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">사용 일수 (일)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={days || ""}
            onChange={(e) => setDays(Number(e.target.value) || 0)}
            placeholder="예: 30"
          />
        </div>

        {/* kWh 단가 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">kWh당 전기요금 (원)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={kwhPrice || ""}
            onChange={(e) => setKwhPrice(Number(e.target.value) || 0)}
            placeholder="예: 140"
          />
          <p className="text-[11px] text-gray-500">
            * 한국 평균 가정용 전기요금은 약 130~150원/kWh 수준입니다.
          </p>
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="grid gap-4 md:grid-cols-3">
        
        {/* 하루 전력 사용량 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">하루 전력 사용량</div>
          <div className="text-lg font-bold">
            {formatNumberFloat(dailyKwh)} kWh
          </div>
        </div>

        {/* 월 전력 사용량 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">월 전력 사용량</div>
          <div className="text-lg font-bold">
            {formatNumberFloat(monthlyKwh)} kWh
          </div>
        </div>

        {/* 월 예상 전기요금 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">월 예상 전기요금</div>
          <div className="text-lg font-bold">
            {formatNumber(Math.round(monthlyCost))} 원
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        
        {/* 하루 예상 전기요금 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">하루 예상 전기요금</div>
          <div className="text-lg font-bold">
            {formatNumber(Math.round(dailyCost))} 원
          </div>
        </div>

        {/* 참고사항 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">참고 사항</div>
          <ul className="text-[11px] text-gray-500 list-disc list-inside space-y-1">
            <li>누진제 반영되지 않은 대략적 요금입니다.</li>
            <li>실제 전기요금은 계절/세대/기본요금에 따라 다를 수 있습니다.</li>
            <li>여름철 지속 가동 시 소비전력 상승할 수 있습니다.</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
