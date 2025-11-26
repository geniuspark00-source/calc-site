"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function PropertyTaxCalculatorUI() {
  // 입력 값
  const [price, setPrice] = useState(0);           // 취득가액(매입가)
  const [acqRate, setAcqRate] = useState(0);       // 취득세율(%)
  const [holdRate, setHoldRate] = useState(0);     // 연 보유세율(%)
  const [years, setYears] = useState(1);           // 보유 기간(년)

  // 계산
  const acquisitionTax = price * (acqRate / 100);          // 취득세
  const annualHoldingTax = price * (holdRate / 100);       // 연 보유세
  const totalHoldingTax = annualHoldingTax * years;        // 전체 보유세
  const totalTax = acquisitionTax + totalHoldingTax;       // 총 세금
  const effectiveCost = price + totalTax;                  // 세금 포함 실질 취득원가

  return (
    <div className="max-w-xl mx-auto p-4">
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        취득세·보유세 계산기
      </h1>

      <p className="text-gray-600 mb-2 leading-relaxed">
        부동산 취득가액과 취득세율, 연 보유세율, 보유 기간을 입력하면
        취득세와 보유세, 총 세금 부담을 자동으로 계산합니다.
      </p>
      <p className="text-xs text-gray-500 mb-6">
        ※ 실제 세율은 주택 수, 공시가격, 지역, 세법 개정 등에 따라 달라질 수 있으므로
        이 계산기는 <span className="font-semibold">참고용</span>으로만 사용해주세요.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        <Input
          label="취득가액 (매입가)"
          value={price}
          onChange={setPrice}
        />
        <Input
          label="취득세율 (%)"
          value={acqRate}
          onChange={setAcqRate}
        />
        <Input
          label="연 보유세율 (%)"
          value={holdRate}
          onChange={setHoldRate}
        />
        <Input
          label="보유 기간 (년)"
          value={years}
          onChange={setYears}
        />
      </div>

      {/* 결과 영역 */}
      <ResultBox title="📌 세금 계산 결과">
        <p>
          취득세:{" "}
          <strong>
            {Math.round(acquisitionTax).toLocaleString()} 원
          </strong>
        </p>

        <p>
          연 보유세:{" "}
          <strong>
            {Math.round(annualHoldingTax).toLocaleString()} 원
          </strong>
        </p>

        <p>
          보유 기간 총 보유세:{" "}
          <strong>
            {Math.round(totalHoldingTax).toLocaleString()} 원
          </strong>
        </p>

        <hr className="my-3" />

        <p>
          총 세금 부담(취득세 + 보유세):{" "}
          <strong className="text-red-700">
            {Math.round(totalTax).toLocaleString()} 원
          </strong>
        </p>

        <p>
          세금 포함 실질 취득원가:{" "}
          <strong className="text-blue-700">
            {Math.round(effectiveCost).toLocaleString()} 원
          </strong>
        </p>
      </ResultBox>
    </div>
  );
}
