"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function YouTubeRevenueCalculatorUI() {
  const [views, setViews] = useState(0); // 조회수
  const [cpm, setCpm] = useState(2000); // 기본 한국 CPM
  const [watchRate, setWatchRate] = useState(50); // 광고 시청률(%)
  const [length, setLength] = useState(8); // 영상 길이(분)
  const [type, setType] = useState("일반영상"); // 일반/쇼츠

  const safeViews = Math.max(0, views);
  const safeCpm = Math.max(0, cpm);
  const safeWatchRate = Math.max(0, Math.min(watchRate, 100));
  const isShorts = type === "쇼츠";

  // 쇼츠는 CPM 다르게 적용
  const appliedCpm = isShorts ? 120 : safeCpm;

  // 광고 시청률 반영
  const rpm = (appliedCpm * (safeWatchRate / 100)) / 1000;

  // 중간광고 (8분 이상이면 RPM × 1.5 정도 보정)
  const finalRpm = length >= 8 && !isShorts ? rpm * 1.5 : rpm;

  const grossRevenue = safeViews * finalRpm; // 전체 수익
  const creatorRevenue = grossRevenue * 0.55; // 유튜버 실제 수령(55%)

  return (
    <div className="max-w-xl mx-auto p-4">
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        유튜브 조회수 → 수익 계산기
      </h1>

      <p className="text-gray-600 mb-6 leading-relaxed">
        한국 기준 CPM·광고 시청률·영상 길이를 반영하여 조회수로 예상 수익을 계산합니다.
        쇼츠도 별도로 계산됩니다.
      </p>

      {/* 입력 영역 */}
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
          <>
            <Input
              label="영상 길이(분)"
              value={length}
              onChange={setLength}
            />
            <Input
              label="CPM(원)"
              value={cpm}
              onChange={setCpm}
            />
          </>
        )}

        <Input
          label="광고 시청률(%)"
          value={watchRate}
          onChange={setWatchRate}
        />
      </div>

      {/* 결과 */}
      <ResultBox title="📌 예상 유튜브 수익">
        <p>
          적용 RPM:{" "}
          <strong>{finalRpm.toFixed(2)} 원</strong>
        </p>

        <p>
          총 광고수익(유튜브 전체):{" "}
          <strong>{Math.round(grossRevenue).toLocaleString()} 원</strong>
        </p>

        <p>
          유튜버 실제 수령액(55%):{" "}
          <strong className="text-green-700 text-xl">
            {Math.round(creatorRevenue).toLocaleString()} 원
          </strong>
        </p>
      </ResultBox>
    </div>
  );
}
