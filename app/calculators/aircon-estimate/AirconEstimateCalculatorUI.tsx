"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function AirconEstimateCalculatorUI() {
  const [type, setType] = useState("벽걸이");

  // 추가 옵션
  const [angle, setAngle] = useState(false);       // 앵글 설치
  const [hole, setHole] = useState(0);             // 타공 개수
  const [vacuum, setVacuum] = useState(false);     // 진공작업

  // 기본 설치비
  const baseInstallPrice: Record<string, number> = {
    벽걸이: 180000,
    스탠드: 210000,
    "2in1": 360000,
  };

  const installPrice = baseInstallPrice[type];

  // 추가 옵션 비용
  const angleCost = angle ? 120000 : 0;
  const holeCost = hole * 30000;
  const vacuumCost = vacuum ? 50000 : 0;

  const total = installPrice + angleCost + holeCost + vacuumCost;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-600">
        에어컨 설치비 견적 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        에어컨 종류와 추가 작업 옵션을 선택하면 예상 설치비를 자동으로 계산합니다.
      </p>

      {/* 입력 영역 */}
      <div className="space-y-3 bg-white p-4 rounded-lg border shadow-sm">

        {/* 종류 선택 */}
        <label className="block text-sm font-medium">에어컨 종류</label>
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="벽걸이">벽걸이</option>
          <option value="스탠드">스탠드</option>
          <option value="2in1">2 in 1</option>
        </select>

        {/* 앵글 설치 */}
        <label className="block text-sm font-medium mt-2">앵글 설치</label>
        <select
          className="w-full border rounded p-2"
          value={angle ? "yes" : "no"}
          onChange={(e) => setAngle(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+120,000원)</option>
        </select>

        {/* 타공 추가 */}
        <Input
          label="타공 추가 (개당 30,000원)"
          value={hole}
          onChange={setHole}
        />

        {/* 진공 작업 */}
        <label className="block text-sm font-medium mt-2">진공 작업</label>
        <select
          className="w-full border rounded p-2"
          value={vacuum ? "yes" : "no"}
          onChange={(e) => setVacuum(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+50,000원)</option>
        </select>

      </div>

      {/* 결과 */}
      <ResultBox
        title="에어컨 설치비 견적 결과"
        results={[
          { label: "에어컨 종류", value: type },
          {
            label: "기본 설치비",
            value: `${installPrice.toLocaleString()} 원`,
          },
          {
            label: "앵글 설치",
            value: `${angleCost.toLocaleString()} 원`,
          },
          {
            label: "타공 추가",
            value: `${holeCost.toLocaleString()} 원`,
          },
          {
            label: "진공 작업",
            value: `${vacuumCost.toLocaleString()} 원`,
          },
          {
            label: "총 예상 비용",
            value: `${total.toLocaleString()} 원`,
          },
        ]}
      />
    </div>
  );
}
