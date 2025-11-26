"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

type Mode = "targetPrice" | "analyzeMargin";

export default function MarginCalculatorUI() {
  const [mode, setMode] = useState<Mode>("targetPrice");

  const [cost, setCost] = useState(0);         // 원가
  const [price, setPrice] = useState(0);       // 판매가
  const [targetMarginRate, setTargetMarginRate] = useState(30); // 목표 마진율(%)

  // 공통 보정
  const safeCost = Math.max(0, cost);
  const safePrice = Math.max(0, price);
  const safeTargetRate = Math.max(0, targetMarginRate);

  // 계산 변수
  let resultTitle = "";
  let displayPrice = 0;
  let marginAmount = 0;
  let marginRateOnPrice = 0;
  let marginRateOnCost = 0;

  if (mode === "targetPrice") {
    // 목표 마진율로 판매가 계산
    // 판매가 = 원가 / (1 - 목표마진율)
    const rate = safeTargetRate / 100;
    if (rate >= 1) {
      displayPrice = 0;
      marginAmount = 0;
      marginRateOnPrice = 0;
      marginRateOnCost = 0;
    } else {
      displayPrice = safeCost / (1 - rate);
      marginAmount = displayPrice - safeCost;
      marginRateOnPrice = displayPrice > 0 ? (marginAmount / displayPrice) * 100 : 0;
      marginRateOnCost = safeCost > 0 ? (marginAmount / safeCost) * 100 : 0;
    }
    resultTitle = "목표 마진율 기준 권장 판매가";
  } else {
    // 원가 & 판매가로 실제 마진 분석
    marginAmount = safePrice - safeCost;
    marginRateOnPrice =
      safePrice > 0 ? (marginAmount / safePrice) * 100 : 0;
    marginRateOnCost =
      safeCost > 0 ? (marginAmount / safeCost) * 100 : 0;
    displayPrice = safePrice;
    resultTitle = "실제 마진 분석 결과";
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        마진율 / 판매가 계산기
      </h1>

      <p className="text-gray-600 mb-2 leading-relaxed">
        원가 기준으로 목표 마진율에 맞는 판매가를 계산하거나,
        실제 판매가 기준으로 마진액과 마진율을 분석할 수 있습니다.
      </p>
      <p className="text-xs text-gray-500 mb-6">
        ※ 마진율은 기본적으로{" "}
        <span className="font-semibold">
          (판매가 - 원가) ÷ 판매가 × 100
        </span>
        {" "}기준으로 계산하며, 원가 기준 수익률도 함께 제공합니다.
      </p>

      {/* 모드 선택 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        <label className="block text-sm font-medium text-gray-700">
          계산 모드
        </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full border rounded-md p-2 mb-4"
        >
          <option value="targetPrice">원가 + 목표 마진율 → 판매가</option>
          <option value="analyzeMargin">원가 + 판매가 → 실제 마진율</option>
        </select>

        {mode === "targetPrice" ? (
          <>
            <Input
              label="원가 (원)"
              value={cost}
              onChange={setCost}
            />
            <Input
              label="목표 마진율 (%)"
              value={targetMarginRate}
              onChange={setTargetMarginRate}
            />
          </>
        ) : (
          <>
            <Input
              label="원가 (원)"
              value={cost}
              onChange={setCost}
            />
            <Input
              label="판매가 (원)"
              value={price}
              onChange={setPrice}
            />
          </>
        )}
      </div>

      <ResultBox title={`📌 ${resultTitle}`}>
        <p>
          기준 판매가:{" "}
          <strong>{Math.round(displayPrice).toLocaleString()} 원</strong>
        </p>

        <p>
          마진액(판매가 - 원가):{" "}
          <strong>
            {Math.round(marginAmount).toLocaleString()} 원
          </strong>
        </p>

        <p>
          마진율(판매가 기준):{" "}
          <strong className="text-green-700">
            {marginRateOnPrice.toFixed(2)}%
          </strong>
        </p>

        <p>
          수익률(원가 기준):{" "}
          <strong>
            {marginRateOnCost.toFixed(2)}%
          </strong>
        </p>
      </ResultBox>
    </div>
  );
}
