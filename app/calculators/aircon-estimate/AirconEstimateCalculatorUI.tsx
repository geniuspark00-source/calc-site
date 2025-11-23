"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function AirconEstimateCalculatorUI() {
  const [type, setType] = useState("벽걸이");
  const [install, setInstall] = useState(false);
  const [cleaning, setCleaning] = useState(false);

  const [extraPipe, setExtraPipe] = useState(0); // 추가 배관(m)
  const [extraWork, setExtraWork] = useState(0); // 추가 작업비(원)

  // 기본 설치가격
  const baseInstallPrice: Record<string, number> = {
    벽걸이: 70000,
    스탠드: 130000,
    천장형: 180000,
    투인원: 160000,
  };

  // 기본 청소가격(완전분해 기준)
  const baseCleaningPrice: Record<string, number> = {
    벽걸이: 40000,
    스탠드: 70000,
    천장형: 90000,
    투인원: 110000,
  };

  const installPrice = install ? baseInstallPrice[type] : 0;
  const cleaningPrice = cleaning ? baseCleaningPrice[type] : 0;

  // 추가 배관 비용 (m당 1만5천)
  const pipeCost = extraPipe * 15000;

  const total = installPrice + cleaningPrice + pipeCost + extraWork;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-600">
        에어컨 설치·청소 비용 견적 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        에어컨 종류, 설치 여부, 추가 배관 등을 선택하면 예상 견적을 자동으로 계산합니다.
      </p>

      {/* 입력 폼 */}
      <div className="space-y-3 bg-white p-4 rounded-lg border shadow-sm">

        {/* 에어컨 종류 */}
        <label className="block text-sm font-medium">에어컨 종류</label>
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="벽걸이">벽걸이</option>
          <option value="스탠드">스탠드</option>
          <option value="천장형">천장형</option>
          <option value="투인원">투인원</option>
        </select>

        {/* 설치 여부 */}
        <label className="block text-sm font-medium mt-2">설치 포함</label>
        <select
          className="w-full border rounded p-2"
          value={install ? "yes" : "no"}
          onChange={(e) => setInstall(e.target.value === "yes")}
        >
          <option value="no">설치 안함</option>
          <option value="yes">설치 포함</option>
        </select>

        {/* 청소 여부 */}
        <label className="block text-sm font-medium mt-2">청소 포함</label>
        <select
          className="w-full border rounded p-2"
          value={cleaning ? "yes" : "no"}
          onChange={(e) => setCleaning(e.target.value === "yes")}
        >
          <option value="no">청소 안함</option>
          <option value="yes">청소 포함</option>
        </select>

        {/* 추가 배관 */}
        <Input
          label="추가 배관 (m)"
          value={extraPipe}
          onChange={setExtraPipe}
        />

        {/* 기타 작업비 */}
        <Input
          label="추가 작업비 (원)"
          value={extraWork}
          onChange={setExtraWork}
        />
      </div>

      {/* 결과 */}
      <ResultBox
        title="에어컨 설치·청소 견적 결과"
        results={[
          { label: "에어컨 종류", value: type },
          {
            label: "설치 비용",
            value: `${installPrice.toLocaleString()} 원`,
          },
          {
            label: "청소 비용",
            value: `${cleaningPrice.toLocaleString()} 원`,
          },
          {
            label: "추가 배관 비용",
            value: `${pipeCost.toLocaleString()} 원`,
          },
          {
            label: "추가 작업비",
            value: `${extraWork.toLocaleString()} 원`,
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
