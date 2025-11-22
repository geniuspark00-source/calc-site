"use client";

import { useState } from "react";

type AirconType = "wall" | "stand";
type ModeType = "cool" | "dry" | "eco" | "turbo";

const AIRCON_POWER = {
  wall: {
    cool: 900,
    dry: 550,
    eco: 450,
    turbo: 1200,
  },
  stand: {
    cool: 1800,
    dry: 1100,
    eco: 800,
    turbo: 2500,
  },
};

export default function AirconModeCalculatorUI() {
  const [type, setType] = useState<AirconType>("wall");
  const [mode, setMode] = useState<ModeType>("cool");
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [days, setDays] = useState(30);
  const [kwhPrice, setKwhPrice] = useState(140);

  const power = AIRCON_POWER[type][mode];
  const baseCoolPower = AIRCON_POWER[type]["cool"];

  const dailyKwh = (power * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * days;

  const dailyCost = dailyKwh * kwhPrice;
  const monthlyCost = monthlyKwh * kwhPrice;

  const coolMonthly = ((baseCoolPower * hoursPerDay) / 1000) * days * kwhPrice;
  const diff = monthlyCost - coolMonthly;

  const format = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  const formatFloat = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 1 });

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 설명 */}
      <p className="text-gray-700 mb-6 leading-relaxed">
        선택한 모드·에어컨 종류에 따라 소비전력 차이를 기반으로 전기요금을 계산합니다.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4 mb-6">

        {/* 에어컨 종류 */}
        <div>
          <label className="block mb-1 text-sm font-medium">에어컨 종류</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as AirconType)}
            className="w-full border rounded p-2"
          >
            <option value="wall">벽걸이 에어컨</option>
            <option value="stand">스탠드 에어컨</option>
          </select>
        </div>

        {/* 모드 */}
        <div>
          <label className="block mb-1 text-sm font-medium">에어컨 모드</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as ModeType)}
            className="w-full border rounded p-2"
          >
            <option value="cool">냉방(기본)</option>
            <option value="dry">제습모드</option>
            <option value="eco">절전(ECO)</option>
            <option value="turbo">파워/터보</option>
          </select>
        </div>

        {/* 시간 */}
        <div>
          <label className="block mb-1 text-sm font-medium">하루 사용시간(시간)</label>
          <input
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        {/* 일수 */}
        <div>
          <label className="block mb-1 text-sm font-medium">사용 일수(일)</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        {/* 단가 */}
        <div>
          <label className="block mb-1 text-sm font-medium">kWh당 전기요금(원)</label>
          <input
            type="number"
            value={kwhPrice}
            onChange={(e) => setKwhPrice(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* 결과 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">

        <p>
          하루 전력 사용량: <strong>{formatFloat(dailyKwh)} kWh</strong>
        </p>

        <p>
          월 전력 사용량: <strong>{formatFloat(monthlyKwh)} kWh</strong>
        </p>

        <p>
          하루 전기요금: <strong>{format(dailyCost)} 원</strong>
        </p>

        <p className="text-lg font-bold text-green-700">
          월 예상 전기요금: {format(monthlyCost)} 원
        </p>

        {/* 냉방 대비 차이 */}
        <p className="pt-2 text-sm">
          냉방모드와 비교 시:{" "}
          <strong
            className={diff > 0 ? "text-red-600" : "text-blue-600"}
          >
            {diff > 0
              ? `+${format(diff)} 원 증가`
              : `${format(Math.abs(diff))} 원 절약`}
          </strong>
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4">
        ※ 실제 전기요금은 누진제·기본요금·계절 요금에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
