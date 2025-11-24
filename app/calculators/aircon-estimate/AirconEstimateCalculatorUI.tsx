"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function AirconEstimateCalculatorUI() {
  const [type, setType] = useState("벽걸이");
  const [angle, setAngle] = useState(false);
  const [pipe, setPipe] = useState(0);
  const [vacuum, setVacuum] = useState(false);
  const [drainPump, setDrainPump] = useState(false);

  const baseInstallPrice: Record<string, number> = {
    벽걸이: 180000,
    스탠드: 210000,
    "2in1": 360000,
  };

  const installPrice = baseInstallPrice[type];
  const angleCost = angle ? 120000 : 0;
  const pipeCost = pipe * 15000;
  const vacuumCost = vacuum ? 50000 : 0;
  const drainPumpCost = drainPump ? 100000 : 0;

  const total = installPrice + angleCost + pipeCost + vacuumCost + drainPumpCost;

  return (
    <div className="space-y-8 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-3xl font-extrabold text-blue-700">
        에어컨 설치비 견적 계산기
      </h1>

      <p className="text-gray-600 leading-relaxed">
        에어컨 종류와 옵션을 선택하면 예상 설치비가 자동 계산됩니다.  
        기본 설치비에는 배관 5M, 타공 1개가 포함되며, 추가 작업은 선택에 따라 비용이 달라집니다.
      </p>

      {/* 안내 박스 */}
      <div className="text-sm text-gray-600 space-y-1 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p>• 기본 설치비에는 배관 5M, 타공 1개가 포함됩니다.</p>
        <p>• 배관 추가는 1M당 15,000원이 추가됩니다.</p>
        <p>• 이전설치의 경우 이동거리에 따라 비용이 산정됩니다.</p>
      </div>

      {/* 입력 영역 */}
      <div className="space-y-4 bg-white p-5 rounded-xl border shadow-sm">

        {/* 에어컨 종류 */}
        <label className="block text-sm font-bold">에어컨 종류</label>
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="벽걸이">벽걸이 에어컨</option>
          <option value="스탠드">스탠드 에어컨</option>
          <option value="2in1">2in1 에어컨</option>
        </select>

        {/* 앵글 */}
        <label className="block text-sm font-bold mt-2">앵글 설치</label>
        <select
          className="w-full border rounded p-2"
          value={angle ? "yes" : "no"}
          onChange={(e) => setAngle(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+120,000원)</option>
        </select>

        {/* 배관 추가 */}
        <Input
          label="배관 추가 (1M당 15,000원)"
          value={pipe}
          onChange={setPipe}
        />

        {/* 진공 작업 */}
        <label className="block text-sm font-bold mt-2">진공 작업</label>
        <select
          className="w-full border rounded p-2"
          value={vacuum ? "yes" : "no"}
          onChange={(e) => setVacuum(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+50,000원)</option>
        </select>

        {/* 배수 펌프 */}
        <label className="block text-sm font-bold mt-2">배수 펌프</label>
        <select
          className="w-full border rounded p-2"
          value={drainPump ? "yes" : "no"}
          onChange={(e) => setDrainPump(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+100,000원)</option>
        </select>
      </div>

      {/* 결과 */}
      <ResultBox
        title="에어컨 설치비 견적 결과"
        results={[
          { label: "에어컨 종류", value: type },
          { label: "기본 설치비", value: `${installPrice.toLocaleString()} 원` },
          { label: "앵글 설치", value: `${angleCost.toLocaleString()} 원` },
          { label: "배관 추가", value: `${pipeCost.toLocaleString()} 원` },
          { label: "진공 작업", value: `${vacuumCost.toLocaleString()} 원` },
          { label: "배수 펌프", value: `${drainPumpCost.toLocaleString()} 원` },
          {
            label: "총 예상 비용",
            value: `${total.toLocaleString()} 원`,
            highlight: true,
          },
        ]}
      />

      {/* CTA 박스 — A버전 프리미엄 블루 */}
      <div className="bg-white p-5 border rounded-xl shadow-sm space-y-3">
        <p className="text-gray-700 font-semibold text-lg">
          이 견적으로 설치하고 싶으신가요?
        </p>

        <a
          href="https://map.naver.com/p/search/%EA%B8%B0%ED%9D%A5%EC%97%90%EC%96%B4%EC%BB%A8%EC%84%A4%EC%B9%98/place/2060152253?placePath=/home"
          target="_blank"
          rel="noopener noreferrer"
          className="
            block text-center font-semibold 
            text-white 
            bg-blue-600 
            py-3 rounded-xl 
            shadow-md 
            hover:bg-blue-700 
            hover:-translate-y-[2px]
            active:translate-y-[1px]
            active:scale-[0.98]
            transition-all duration-200
          "
        >
          네이버 플레이스로 이동하기
        </a>

        <p className="text-xs text-gray-500 text-center">
          코끼리에어컨 에어컨 설치 전문 — A/S 1년 보증
        </p>
      </div>

    </div>
  );
}
