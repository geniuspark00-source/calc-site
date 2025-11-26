"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function YouTubeRevenueCalculatorUI() {
  const [views, setViews] = useState(0);
  const [length, setLength] = useState(8);
  const [type, setType] = useState("일반영상");

  const isShorts = type === "쇼츠";
  const safeViews = Math.max(0, views);

  // ===== 평균값 자동 적용 =====

  // 일반영상 기본값
  const avgCpm = 2200; // 한국 평균 CPM
  const avgWatchRate = 0.45; // 평균 광고 시청률(45%)

  // 쇼츠 기본 RPM(평균)
  const shortsAvgRpm = 0.12; // 조회수 1회당 0.12원 수준

  let rpm = 0;

  if (isShorts) {
    rpm = shortsAvgRpm;
  } else {
    // 일반영상 RPM = CPM × (광고시청률/100) / 1000
    rpm = (avgCpm * avgWatchRate) / 1000;

    // 영상이 8분 이상이면 중간광고 가능 → RPM × 1.5
    if (length >= 8) {
      rpm *= 1.5;
    }
  }

  const grossRevenue = safeViews * rpm; // 전체 수익
  const creatorRevenue = grossRevenue * 0.55; // 실제 수령 55%

  return (
    <div className="max-w-xl mx-auto p-4">
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        유튜브 조회수 → 예상 수익 계산기
      </h1>

      <p className="text-gray-600 mb-6 leading-relaxed">
        일반 영상과 쇼츠의 한국 평균 광고단가(CPM)와 시청률을 자동 적용하여
        조회수만으로 예상 수익을 계산합니다.
      </p>

      {/* 입력 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        <Input label="조회수" value={views} onChange={setViews} />

        <label className="block text-sm font-medium">영상 유형</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option>일반영상</option>
          <option>쇼츠</option>
        </select>

        {!isShorts && (
          <Input
            label="영상 길이(분)"
            value={length}
            onChange={setLength}
          />
        )}
      </div>

      {/* 결과 */}
      <ResultBox title="📌 예상 수익">
        <p>
          적용 RPM(조회수 1회당 수익):{" "}
          <strong>{rpm.toFixed(3)} 원</strong>
        </p>

        <p>
          총 광고수익(전체):{" "}
          <strong>{Math.round(grossRevenue).toLocaleString()} 원</strong>
        </p>

        <p>
          실제 수령액(유튜버 55%):{" "}
          <strong className="text-green-700 text-xl">
            {Math.round(creatorRevenue).toLocaleString()} 원
          </strong>
        </p>
      </ResultBox>
    </div>
  );
}
