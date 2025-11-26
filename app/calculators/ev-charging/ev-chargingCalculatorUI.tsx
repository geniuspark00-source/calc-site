"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function EvChargingCalculatorUI() {
  const [battery, setBattery] = useState(72);               // 배터리 용량(kWh)
  const [efficiency, setEfficiency] = useState(90);         // 충전 효율(%)
  const [slowRate, setSlowRate] = useState(280);            // 완속(AC) 단가(원/kWh)
  const [fastRate, setFastRate] = useState(350);            // 급속(DC) 단가(원/kWh)
  const [kwhPerKm, setKwhPerKm] = useState(0.17);           // km당 kWh 소모량
  const [dailyKm, setDailyKm] = useState(40);               // 하루 주행거리

  // 실제 필요한 충전량 = 배터리 용량 ÷ (효율 / 100)
  const realKwh = battery / (efficiency / 100);

  // 완속 충전 비용
  const slowCost = realKwh * slowRate;

  // 급속 충전 비용
  const fastCost = realKwh * fastRate;

  // 월/연간 (완속 기준)
  const monthlyCost = slowCost * 30; 
  const yearlyCost = slowCost * 365;

  // kWh → 1km 충전요금
  const kmCost = (kwhPerKm * slowRate).toFixed(0);

  // 하루 충전비
  const dailyCost = dailyKm * Number(kmCost);

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-700">
        전기차 충전비 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        배터리 용량과 충전 단가를 입력하면 1회 충전 비용과 월/연간 충전비를 자동 계산합니다.
      </p>

      {/* 입력 */}
      <div className="grid gap-4">
        <Input label="배터리 용량 (kWh)" value={battery} onChange={setBattery} />
        <Input label="충전 효율 (%)" value={efficiency} onChange={setEfficiency} />
        <Input label="완속 충전 단가 (원/kWh)" value={slowRate} onChange={setSlowRate} />
        <Input label="급속 충전 단가 (원/kWh)" value={fastRate} onChange={setFastRate} />
        <Input label="전비 (kWh/km)" value={kwhPerKm} onChange={setKwhPerKm} />
        <Input label="하루 주행거리 (km)" value={dailyKm} onChange={setDailyKm} />
      </div>

      {/* 결과 */}
      <ResultBox
        title="충전 비용 계산 결과"
        results={[
          { label: "실제 필요한 충전량", value: `${realKwh.toFixed(1)} kWh` },
          { label: "완속 1회 충전비", value: `${slowCost.toFixed(0)} 원` },
          { label: "급속 1회 충전비", value: `${fastCost.toFixed(0)} 원` },
          { label: "월 충전비(완속 기준)", value: `${monthlyCost.toFixed(0)} 원` },
          { label: "연 충전비(완속 기준)", value: `${yearlyCost.toFixed(0)} 원` },
          { label: "1km 주행 충전비", value: `${kmCost} 원` },
          { label: "하루 충전비(주행기준)", value: `${dailyCost.toFixed(0)} 원` },
        ]}
      />
    </div>
  );
}
