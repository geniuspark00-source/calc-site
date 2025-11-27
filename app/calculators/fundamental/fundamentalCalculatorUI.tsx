"use client";

import { useState } from "react";
import Link from "next/link";
import FloatInput from "@/components/FloatInput";
import ResultBox from "@/components/ResultBox";

export default function FundamentalCalculatorUI() {
  // number 기반 유지
  const [eps, setEps] = useState(0);
  const [per, setPer] = useState(10);
  const [bps, setBps] = useState(0);
  const [pbr, setPbr] = useState(1);
  const [roe, setRoe] = useState(10);
  const [shares, setShares] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  // 계산
  const targetPricePER = eps * per;
  const targetPricePBR = bps * pbr;
  const fairPrice = (targetPricePER + targetPricePBR) / 2;

  const roePBRlow = (roe / 10).toFixed(2);
  const roePBRhigh = (roe / 5).toFixed(2);

  const currentMarketCap = currentPrice * shares;
  const targetMarketCap = fairPrice * shares;

  const upPotential =
    currentPrice > 0
      ? (((fairPrice - currentPrice) / currentPrice) * 100).toFixed(2)
      : 0;

  return (
    <div className="space-y-6">

      {/* 🔵 목록으로 돌아가기 (버튼스타일) */}
      <Link
        href="/"
        className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 border inline-block"
      >
        ← 계산기 목록
      </Link>

      {/* 안내문구 */}
      <div className="p-4 bg-yellow-50 text-sm text-gray-700 rounded leading-relaxed">
        ※ PBR·ROE·EPS 등의 값은 
        <strong> 네이버증권 또는 전자공시(DART) </strong>에서 확인한 값을 입력하세요.<br/>
        ※ 본 계산기는 <strong>현재 재무제표 기준의 가치</strong>만 반영하며, 
        <strong>미래 성장성·업황 변화·신사업 효과는 반영되지 않습니다.</strong><br/>
        ※ 소수점 입력이 가능합니다. (예: 6.57, 1.23 등)
      </div>

      {/* 입력 */}
      <div className="grid grid-cols-1 gap-4">
        <FloatInput label="EPS (주당순이익)" value={eps} onChange={setEps} />
        <FloatInput label="목표 PER" value={per} onChange={setPer} />
        <FloatInput label="BPS (주당순자산)" value={bps} onChange={setBps} />
        <FloatInput label="목표 PBR" value={pbr} onChange={setPbr} />
        <FloatInput label="ROE (%)" value={roe} onChange={setRoe} />
        <FloatInput label="발행주식수" value={shares} onChange={setShares} />
        <FloatInput label="현재 주가" value={currentPrice} onChange={setCurrentPrice} />
      </div>

      {/* 결과 */}
      <ResultBox
        title="재무 펀더멘탈 분석 결과"
        results={[
          {
            label: "PER 기준 목표주가",
            value: `${targetPricePER.toLocaleString()}원`,
            highlight: true,
          },
          {
            label: "PBR 기준 목표주가",
            value: `${targetPricePBR.toLocaleString()}원`,
          },
          {
            label: "적정주가(평균)",
            value: `${fairPrice.toLocaleString()}원`,
            highlight: true,
          },
          {
            label: "ROE 기반 적정 PBR (보수적)",
            value: roePBRlow,
          },
          {
            label: "ROE 기반 적정 PBR (공격적)",
            value: roePBRhigh,
          },
          {
            label: "현재 주가 대비 상승여력",
            value: `${upPotential}%`,
          },
          {
            label: "현재 시가총액",
            value: `${currentMarketCap.toLocaleString()}원`,
          },
          {
            label: "목표 시가총액",
            value: `${targetMarketCap.toLocaleString()}원`,
          },
        ]}
      />
    </div>
  );
}
