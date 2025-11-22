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
  const [kwhPrice, setKwhPrice] = useState<number>(140);

  useEffect(() => {
    setPower(AIRCON_PRESET[type].power);
  }, [type]);

  const dailyKwh = (power * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * days;
  const dailyCost = dailyKwh * kwhPrice;
  const monthlyCost = monthlyKwh * kwhPrice;

  const formatNumber = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

  const formatNumberFloat = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 1 });

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* 🔙 돌아가기 링크 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        에어컨 전기요금 계산기
      </h1>

      {/* 설명 */}
      <p className="text-gray-600 mb-6 leading-relaxed">
        벽걸이·스탠드·2in1 에어컨의 평균 소비전력을 기준으로
        <br />
        하루 사용시간과 kWh 단가를 입력하면 월 전기요금을 계산합니다.
      </p>

      {/* 입력 박스 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

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

        {/* 하루 시간 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">하루 사용시간(시간)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={hoursPerDay || ""}
            onChange={(e) => setHoursPerDay(Number(e.target.value) || 0)}
          />
        </div>

        {/* 일수 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">사용 일수(일)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={days || ""}
            onChange={(e) => setDays(Number(e.target.value) || 0)}
          />
        </div>

        {/* kWh 단가 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">kWh당 전기요금(원)</label>
          <input
            type="number"
            className="border rounded-md px-3 py-2 text-sm"
            value={kwhPrice || ""}
            onChange={(e) => setKwhPrice(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3 mb-4">
        <p>
          일간 사용량:{" "}
          <strong>{formatNumberFloat(dailyKwh)} kWh</strong>
        </p>
        <p>
          월간 사용량:{" "}
          <strong>{formatNumberFloat(monthlyKwh)} kWh</strong>
        </p>
        <p>
          하루 예상 전기요금:{" "}
          <strong>{formatNumber(Math.round(dailyCost))} 원</strong>
        </p>
        <p className="text-lg font-bold text-green-700">
          월 예상 전기요금: {formatNumber(Math.round(monthlyCost))} 원
        </p>
      </div>

      {/* 참고 */}
      <p className="text-[12px] text-gray-500 leading-relaxed">
        ※ 누진제·기본요금은 반영되지 않은 대략 계산입니다.
        <br />
        ※ 실제 전기요금은 계절·세대별 요금제에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
