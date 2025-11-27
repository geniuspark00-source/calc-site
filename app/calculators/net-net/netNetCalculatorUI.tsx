"use client";

import { useState } from "react";
import FloatInput from "@/components/FloatInput";
import ResultBox from "@/components/ResultBox";
import Link from "next/link";

export default function NetNetCalculatorUI() {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentAssets, setCurrentAssets] = useState<number>(0);
  const [totalLiabilities, setTotalLiabilities] = useState<number>(0);
  const [shares, setShares] = useState<number>(0);

  const netNetValue =
    shares > 0 ? (currentAssets - totalLiabilities) / shares : 0;

  const diff = currentPrice > 0 ? ((netNetValue - currentPrice) / currentPrice) * 100 : 0;

  const diffText =
    currentPrice > 0
      ? diff >= 0
        ? `현재 주가 대비 약 +${diff.toFixed(2)}% (저평가 가능성)`
        : `현재 주가 대비 ${diff.toFixed(2)}% (고평가)`
      : "현재 주가를 입력하면 해석을 제공합니다.";

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">벤저민 그레이엄의 안전마진 계산기</h2>

      <FloatInput
        label="현재 주가(선택)"
        value={currentPrice}
        onChange={setCurrentPrice}
        type="number"
        step="0.01"
        placeholder="예: 8500"
      />

      <FloatInput
        label="유동자산(Current Assets)"
        value={currentAssets}
        onChange={setCurrentAssets}
        type="number"
        step="1"
        placeholder="예: 120000000000"
      />

      <FloatInput
        label="총부채(Total Liabilities)"
        value={totalLiabilities}
        onChange={setTotalLiabilities}
        type="number"
        step="1"
        placeholder="예: 80000000000"
      />

      <FloatInput
        label="총 발행주식수(Shares Outstanding)"
        value={shares}
        onChange={setShares}
        type="number"
        step="1"
        placeholder="예: 10000000"
      />

      <ResultBox title="계산 결과">
        <p>📌 <strong>1주당 안전마진(Net-Net):</strong> {netNetValue.toLocaleString()} 원</p>
        <p className="mt-2">📈 {diffText}</p>

        <p className="mt-3 text-sm text-gray-600">
          ※ 안전마진(Net-Net)은 벤저민 그레이엄이 극단적 저평가 기업을 찾을 때 사용한 방식입니다.
          유동자산에서 총부채를 뺀 금액을 발행주식수로 나누어 계산합니다.
        </p>
      </ResultBox>

      {/* 목록으로 돌아가기 */}
      <Link 
        href="/calculators"
        className="block w-full mt-4 py-3 text-center bg-gray-100 hover:bg-gray-200 rounded-lg border"
      >
        ← 계산기 목록으로 돌아가기
      </Link>
    </div>
  );
}
