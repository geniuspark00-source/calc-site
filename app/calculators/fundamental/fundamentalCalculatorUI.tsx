"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function FundamentalCalculatorUI() {
  // number 기반 유지 (Input.tsx 규칙)
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

      {/* 안내문구 */}
      <div className="p-4 bg-yellow-50 text-sm text-gray-700 rounded leading-relaxed">
        ※ PBR·ROE·EPS 등의 지표는 
        <strong> 네이버증권 또는 전자공시(DART) </strong>에서 확인한 값을 입력하세요.<br/>
        ※ 본 계산기는 <strong>현재 재무제표 기준</strong>의 가치를 기반으로 하며, 
        <strong>미래 성장성·업황 변화·신사업 효과는 반영되지 않습니다.</strong>
      </div>

      {/* 입력 */}
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="EPS (주당순이익)"
          value={eps}
          onChange={setEps}
          type="number"
          step="0.01"
          placeholder="예: 1234.56"
        />
        <Input
          label="목표 PER"
          value={per}
          onChange={setPer}
          type="number"
          step="0.01"
          placeholder="예: 12.5"
        />
        <Input
          label="BPS (주당순자산)"
          value={bps}
          onChange={setBps}
          type="number"
          step="0.01"
          placeholder="예: 15000"
        />
        <Input
          label="목표 PBR"
          value={pbr}
          onChange={setPbr}
          type="number"
          step="0.01"
          placeholder="예: 1.2"
        />
        <Input
          label="ROE (%)"
          value={roe}
          onChange={setRoe}
          type="number"
          step="0.01"
          placeholder="예: 8.5"
        />
        <Input
          label="발행주식수"
          value={shares}
          onChange={setShares}
          type="number"
          step="1"
        />
        <Input
          label="현재 주가"
          value={currentPrice}
          onChange={setCurrentPrice}
          type="number"
          step="0.01"
        />
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
