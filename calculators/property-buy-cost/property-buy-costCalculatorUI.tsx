"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function PropertyBuyCostCalculatorUI() {
  const [price, setPrice] = useState(0);        // 매매가
  const [type, setType] = useState("아파트");   // 주택 종류
  const [lawyer, setLawyer] = useState(300000); // 법무사비
  const [etc, setEtc] = useState(200000);       // 기타 등기비용

  // ▷ 취득세율 계산
  const getTaxRate = () => {
    if (price < 600000000) return 0.01;
    if (price < 900000000) return 0.02;
    return 0.03;
  };

  const acquisitionTax = Math.floor(price * getTaxRate());

  // ▷ 중개수수료 요율
  const getBrokerRate = () => {
    if (price <= 50000000) return 0.006;
    if (price <= 200000000) return 0.005;
    if (price <= 600000000) return 0.004;
    if (price <= 900000000) return 0.005;
    return 0.009;
  };

  const brokerageFee = Math.min(price * getBrokerRate(), 9000000);

  const totalCost = acquisitionTax + brokerageFee + lawyer + etc;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-700">부동산 총구매비용 계산기</h1>

      <p className="text-gray-600 mb-6">
        취득세·중개수수료·법무사비·등기비 등 실제 구매 시 필요한 모든 비용을 계산합니다.
      </p>

      {/* 입력 영역 */}
      <div className="space-y-3 bg-white p-4 rounded-lg border shadow-sm">

        <label className="block text-sm font-medium">주택 종류</label>
        <select
          className="w-full border rounded p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="아파트">아파트</option>
          <option value="빌라">빌라</option>
          <option value="오피스텔">오피스텔</option>
          <option value="단독/다가구">단독/다가구</option>
        </select>

        <Input
          label="매매가 (원)"
          value={price}
          onChange={setPrice}
        />

        <Input
          label="법무사비 (원)"
          value={lawyer}
          onChange={setLawyer}
        />

        <Input
          label="기타 등기비용 (원)"
          value={etc}
          onChange={setEtc}
        />
      </div>

      {/* 결과 */}
      <ResultBox
        title="부동산 총구매비용 계산 결과"
        results={[
          { label: "취득세", value: `${acquisitionTax.toLocaleString()} 원` },
          { label: "중개수수료", value: `${brokerageFee.toLocaleString()} 원` },
          { label: "법무사비", value: `${lawyer.toLocaleString()} 원` },
          { label: "기타 등기비용", value: `${etc.toLocaleString()} 원` },
          {
            label: "총 추가 비용",
            value: `${totalCost.toLocaleString()} 원`,
          },
        ]}
      />
    </div>
  );
}
