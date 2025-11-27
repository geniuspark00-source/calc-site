"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function FundamentalCalculatorUI() {
  // string 기반 입력 → parseFloat로 소수점 처리 가능
  const [eps, setEps] = useState("");
  const [per, setPer] = useState("10");
  const [bps, setBps] = useState("");
  const [pbr, setPbr] = useState("1");
  const [roe, setRoe] = useState("10");
  const [shares, setShares] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  // 숫자 변환 (parseFloat)
  const epsNum = parseFloat(eps) || 0;
  const perNum = parseFloat(per) || 0;
  const bpsNum = parseFloat(bps) || 0;
  const pbrNum = parseFloat(pbr) || 0;
  const roeNum = parseFloat(roe) || 0;
  const sharesNum = parseFloat(shares) || 0;
  const currentPriceNum = parseFloat(currentPrice) || 0;

  // ===== 계산 로직 =====
  const targetPricePER = epsNum * perNum;
  const targetPricePBR = bpsNum * pbrNum;
  const fairPrice = (targetPricePER + targetPricePBR) / 2;

  const roePBRlow = (roeNum / 10).toFixed(2);   // ROE 기반 PBR 보수적
  const roePBRhigh = (roeNum / 5).toFixed(2);   // ROE 기반 PBR 공격적

  const currentMarketCap = currentPriceNum * sharesNum;
  const targetMarketCap = fairPrice * sharesNum;

  const upPotential =
    currentPriceNum > 0
      ? (((fairPrice - currentPriceNum) / currentPriceNum) * 100).toFixed(2)
      : 0;

  return (
    <div className="space-y-6">

      {/* ===== 안내 문구 ===== */}
      <div className="p-4 bg-yellow-50 text-sm text-gray-700 rounded leading-relaxed">
        ※ PBR, ROE, EPS 등의 지표는 
        <strong> 네이버증권, 전자공시(DART) </strong> 등의 공식 재무자료를 참고하여 입력하세요.<br/>
        ※ 본 계산기는 <strong>현재 재무제표 기준의 가치</strong>만 반영하며, 
        <strong> 미래 성장성·신사업·업황 변화 </strong> 등은 반영되지 않습니다.
      </div>

      {/* ===== 입력부 ===== */}
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
          placeholder="예: 100000000"
        />
        <Input
          label="현재 주가"
          value={currentPrice}
          onChange={setCurrentPrice}
          type="number"
          step="0.01"
          placeholder="예: 52300"
        />
      </div>

      {/* ===== 결과 출력 ===== */}
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
