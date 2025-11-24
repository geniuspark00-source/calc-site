"use client";

import { useState, useRef } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function AirconEstimateCalculatorUI() {
  const [type, setType] = useState("벽걸이");

  const [angle, setAngle] = useState(false);
  const [hole, setHole] = useState(0);
  const [vacuum, setVacuum] = useState(false);

  const [pipeLength, setPipeLength] = useState(5); // 배관 전체 길이 입력
  const [pump, setPump] = useState(false); // 배수 펌프 옵션 추가

  const resultRef = useRef<HTMLDivElement | null>(null);

  // 기본 설치비
  const baseInstallPrice: Record<string, number> = {
    벽걸이: 180000,
    스탠드: 210000,
    "2in1": 360000,
  };

  const installPrice = baseInstallPrice[type];

  // 배관 연장 비용 — 기본 5M 포함
  const extraPipe = Math.max(0, pipeLength - 5);
  const pipeCost = extraPipe * 15000; // 1m당 15,000원

  // 기존 옵션 비용
  const angleCost = angle ? 120000 : 0;
  const holeCost = hole * 30000;
  const vacuumCost = vacuum ? 50000 : 0;

  // 새 옵션 비용
  const pumpCost = pump ? 100000 : 0;

  // 총합
  const total =
    installPrice +
    angleCost +
    holeCost +
    vacuumCost +
    pipeCost +
    pumpCost;

  // 요약 문장 자동 생성
  const summaryText = `${type} 기본 설치비 + ${
    extraPipe > 0 ? `배관 ${extraPipe}m 연장 포함 + ` : ""
  }${hole > 0 ? `타공 ${hole}개 + ` : ""}${
    angle ? "앵글 설치 포함 + " : ""
  }${pump ? "배수 펌프 포함 + " : ""}${
    vacuum ? "진공 작업 포함" : ""
  } 기준입니다.`.replace(/\+\s$/, "");

  const handleScrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });

      // GA4 이벤트 (선택)
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "aircon_estimate_calculated", {
          type,
          pipeLength,
          angle,
          hole,
          pump,
          vacuum,
        });
      }
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-600">
        에어컨 설치비 견적 계산기
      </h1>

      <p className="text-gray-600">
        에어컨 종류와 작업 옵션을 선택하면 예상 설치비가 자동 계산됩니다.
      </p>

      {/* 안내 박스 */}
      <div className="text-sm text-gray-500 space-y-1 mb-6 bg-white p-4 border rounded-lg shadow-sm">
        <p>• 기본 설치비에는 <b>배관 5M, 타공 1개</b>가 포함됩니다.</p>
        <p>• 배관 5M 초과 시 1m당 <b>15,000원</b>이 추가됩니다.</p>
        <p>• 이전 설치 시 이전비용은 <b>이동 거리·환경에 따라 산정</b>됩니다.</p>
        <p>• 모든 설치 작업은 <b>1년 A/S</b>를 제공합니다.</p>
      </div>

      {/* 입력 영역 */}
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
          <option value="2in1">2 in 1</option>
        </select>

        {/* 배관 길이 */}
        <Input
          label="배관 전체 길이 (기본 5M 포함 · 추가 1M당 15,000원)"
          value={pipeLength}
          onChange={setPipeLength}
        />

        {/* 앵글 */}
        <label className="block text-sm font-medium mt-2">앵글 설치</label>
        <select
          className="w-full border rounded p-2"
          value={angle ? "yes" : "no"}
          onChange={(e) => setAngle(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+120,000원)</option>
        </select>

        {/* 타공 */}
        <Input
          label="타공 추가 (개당 30,000원)"
          value={hole}
          onChange={setHole}
        />

        {/* 배수 펌프 */}
        <label className="block text-sm font-medium mt-2">배수 펌프</label>
        <select
          className="w-full border rounded p-2"
          value={pump ? "yes" : "no"}
          onChange={(e) => setPump(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+100,000원)</option>
        </select>

        {/* 진공작업 */}
        <label className="block text-sm font-medium mt-2">진공 작업</label>
        <select
          className="w-full border rounded p-2"
          value={vacuum ? "yes" : "no"}
          onChange={(e) => setVacuum(e.target.value === "yes")}
        >
          <option value="no">미포함</option>
          <option value="yes">포함 (+50,000원)</option>
        </select>

        <button
          onClick={handleScrollToResult}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          설치비 계산하기
        </button>
      </div>

      {/* 계산 결과 */}
      <div ref={resultRef}>
        <ResultBox
          title="에어컨 설치비 견적 결과"
          results={[
            { label: "에어컨 종류", value: type },
            { label: "기본 설치비", value: `${installPrice.toLocaleString()} 원` },
            { label: "배관 연장비", value: `${pipeCost.toLocaleString()} 원` },
            { label: "앵글 설치", value: `${angleCost.toLocaleString()} 원` },
            { label: "타공 추가", value: `${holeCost.toLocaleString()} 원` },
            { label: "배수 펌프", value: `${pumpCost.toLocaleString()} 원` },
            { label: "진공 작업", value: `${vacuumCost.toLocaleString()} 원` },
            {
              label: "총 예상 비용",
              value: `${total.toLocaleString()} 원`,
              highlight: true,
            },
          ]}
        />

        {/* 자동 생성 문장 */}
        <p className="text-gray-600 text-sm mt-2">
          📌 {summaryText}
        </p>

        {/* 절약 문구 */}
        <p className="text-green-700 text-sm font-medium mt-1">
          ✔ 업계 평균 대비 약 15~30% 절약 가능한 견적입니다.
        </p>

        {/* A/S 안내 */}
        <p className="text-gray-500 text-sm mt-1">
          ✔ 모든 설치 작업은 1년 A/S를 제공합니다.
        </p>
      </div>

      {/* CTA 버튼 */}
      <div className="bg-white p-4 border rounded-lg shadow-sm space-y-3 mt-4">
        <p className="text-gray-700 font-medium">
          이 견적으로 설치하고 싶으신가요?
        </p>

        <a
          href="https://map.naver.com/p/search/%EA%B8%B0%ED%9D%A5%EC%97%90%EC%96%B4%EC%BB%A8%EC%84%A4%EC%B9%98/place/2060152253"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          네이버 플레이스로 이동하기
        </a>
      </div>
    </div>
  );
}
