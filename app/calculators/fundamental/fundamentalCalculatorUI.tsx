"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function FundamentalCalculatorUI() {
  const [eps, setEps] = useState(0);         // EPS
  const [per, setPer] = useState(10);        // 목표 PER
  const [bps, setBps] = useState(0);         // BPS
  const [pbr, setPbr] = useState(1);         // 목표 PBR
  const [roe, setRoe] = useState(10);        // ROE (%)
  const [shares, setShares] = useState(100000000); // 발행주식수
  const [currentPrice, setCurrentPrice] = useState(0); // 현재 주가

  // ===== 계산 로직 =====

  const targetPricePER = eps * per;
  const targetPricePBR = bps * pbr;
  const fairPrice = (targetPricePER + targetPricePBR) / 2;

  const roePBRlow = (roe / 10).toFixed(2);   // 보수적
  const roePBRhigh = (roe / 5).toFixed(2);   // 공격적

  const currentMarketCap = currentPrice * shares;
  const targetMarketCap = fairPrice * shares;

  const upPotential =
    currentPrice > 0 ? (((fairPrice - currentPrice) / currentPrice) * 100).toFixed(2) : 0;

  return (
    <div className="space-y-6">
      {/* ===== 입력부 ===== */}
      <div className="grid grid-cols-1 gap-4">
        <Input label="EPS (주당순이익)" value={eps} onChange={setEps} />
        <Input label="목표 PER" value={per} onChange={setPer} />
        <Input label="BPS (주당순자산)" value={bps} onChange={setBps} />
        <Input label="목표 PBR" value={pbr} onChange={setPbr} />
        <Input label="ROE (%)" value={roe} onChange={setRoe} />
        <Input label="발행주식수" value={shares} onChange={setShares} />
        <Input label="현재 주가" value={currentPrice} onChange={setCurrentPrice} />
      </div>

      {/* ===== 결과 출력 ===== */}
      <ResultBox
        title="재무 펀더멘탈 분석 결과"
        results={[
          { label: "PER 기준 목표주가", value: `${targetPricePER.toLocaleString()}원`, highlight: true },
          { label: "PBR 기준 목표주가", value: `${targetPricePBR.toLocaleString()}원` },
          { label: "적정주가(평균)", value: `${fairPrice.toLocaleString()}원`, highlight: true },

          { label: "ROE 기반 적정 PBR (보수적)", value: roePBRlow },
          { label: "ROE 기반 적정 PBR (공격적)", value: roePBRhigh },

          { label: "현재 주가 대비 상승여력", value: `${upPotential}%` },
          { label: "현재 시가총액", value: `${currentMarketCap.toLocaleString()}원` },
          { label: "목표 시가총액", value: `${targetMarketCap.toLocaleString()}원` },
        ]}
      />
    </div>
  );
}
