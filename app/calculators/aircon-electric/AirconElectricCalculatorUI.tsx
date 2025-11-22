// app/calculators/aircon-electric/AirconElectricCalculatorUI.tsx
"use client";

import { useState, useEffect } from "react";

type PresetKey = "custom" | "wall_6" | "wall_10" | "stand_18";

const PRESET_POWER: Record<PresetKey, { label: string; power: number }> = {
  custom: { label: "직접 입력", power: 1000 },
  wall_6: { label: "6평 벽걸이 (약 700W)", power: 700 },
  wall_10: { label: "10평 벽걸이 (약 1,000W)", power: 1000 },
  stand_18: { label: "18평 스탠드 (약 2,000W)", power: 2000 },
};

export default function AirconElectricCalculatorUI() {
  const [preset, setPreset] = useState<PresetKey>("wall_10");
  const [power, setPower] = useState<number>(PRESET_POWER["wall_10"].power); // 소비전력(W)
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // 하루 사용시간
  const [days, setDays] = useState<number>(30); // 사용 일수
  const [kwhPrice, setKwhPrice] = useState<number>(140); // kWh당 단가(원) - 기본값 대략치

  // 프리셋 선택 시 소비전력 자동 변경
  useEffect(() => {
    if (preset !== "custom") {
      setPower(PRESET_POWER[preset].power);
    }
  }, [preset]);

  const dailyKwh = (power * hoursPerDay) / 1000; // kWh
  const monthlyKwh = dailyKwh * days;
  const monthlyCost = monthlyKwh * kwhPrice;
  const dailyCost = dailyKwh * kwhPrice;

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
        {/* 프리셋 선택 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">에어컨 종류(대략 소비전력)</label>
          <select
            className="border rounded-md px-3 py-2 text-sm"
            value={preset}
            onChange={(e) => setPreset(e.target.value as PresetKey)}
          >
            {Object.entries(PRESET_POWER).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-gray-500">
            정확한 소비전력을 알고 있다면 &quot;직접 입력&quot;을 선택하고
            W 값을 입력하세요.
          </p>
        </div>

        {/* 소비전력 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">소비전력 (W)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={power || ""}
            onChange={(e) => {
              setPreset("custom");
              setPower(Number(e.target.value) || 0);
            }}
            placeholder="예: 1000"
          />
          <p className="text-[11px] text-gray-500">
            실내기 스펙에 적힌 &quot;정격소비전력&quot;(W)을 참고하면 더
            정확합니다.
          </p>
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
            실제 전기요금 고지서 &quot;kWh단가&quot;를 참고해서 수정하면
            더 정확합니다. (누진제는 반영되지 않은 대략 값입니다.)
          </p>
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">하루 전력 사용량</div>
          <div className="text-lg font-bold">
            {formatNumberFloat(dailyKwh)} kWh
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            소비전력 × 사용시간 / 1000
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">월 전력 사용량</div>
          <div className="text-lg font-bold">
            {formatNumberFloat(monthlyKwh)} kWh
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            하루 사용량 × 사용 일수
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">월 예상 전기요금</div>
          <div className="text-lg font-bold">
            {formatNumber(Math.round(monthlyCost))} 원
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            kWh당 {kwhPrice.toLocaleString("ko-KR")}원 기준
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">하루 예상 전기요금</div>
          <div className="text-lg font-bold">
            {formatNumber(Math.round(dailyCost))} 원
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-xs text-gray-500 mb-1">참고 사항</div>
          <ul className="text-[11px] text-gray-500 list-disc list-inside space-y-1">
            <li>실제 전기요금은 누진제, 기본요금에 따라 달라질 수 있습니다.</li>
            <li>
              장시간 가동, 여러 대 동시 사용 시에는 전체 소비전력을 합산해서
              계산해 보세요.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
