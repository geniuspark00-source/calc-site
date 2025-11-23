"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function PropertyBuyCostCalculatorUI() {
  const [price, setPrice] = useState(0);         // 매매가
  const [type, setType] = useState("아파트");    // 주택 종류
  const [lawyer, setLawyer] = useState(300000);  // 법무사비
  const [etc, setEtc] = useState(200000);        // 기타 등기비용

  // ▷ 취득세 단순 계산 (실제는 복잡하지만 표준 방식)
  const getTaxRate = () => {
    if (price < 600000000) return 0.01;
    if (price < 900000000) return 0.02;
    return 0.03;
  };

  const taxRate = getTaxRate();
  const acquisitionTax = Math.floor(price * taxRate);

  // ▷ 법정 중개수수료 요율
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
    <div className="space-y-6">
      
      {/* 제목 영역 */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">부동산 총구매비용 계산기</h1>
        <p className="text-sm text-gray-600">
          취득세, 중개수수료, 법무사비, 등기비용까지 모두 더해 실제 구매 시 필요한 총 비용을 계산합니다.
        </p>
      </section>

      {/* 입력 영역 */}
      <section className="grid gap-4 md:grid-cols-2">

        <Input
          label="매매가"
          value={price}
          onChange={setPrice}
          placeholder="예: 450,000,000"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            주택 종류
          </label>
          <select
            className="w-full border rounded-md p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="아파트">아파트</option>
            <option value="빌라">빌라</option>
            <option value="오피스텔">오피스텔</option>
            <option value="단독/다가구">단독/다가구</option>
          </select>
        </div>

        <Input
          label="법무사비"
          value={lawyer}
          onChange={setLawyer}
          placeholder="예: 300,000"
        />

        <Input
          label="기타 등기비용"
          value={etc}
          onChange={setEtc}
          placeholder="예: 200,000"
        />
      </section>

      {/* 결과 영역 */}
      <section className="grid gap-4 md:grid-cols-2">
        <ResultBox label="취득세" value={acquisitionTax} unit="원" />
        <ResultBox label="중개수수료" value={brokerageFee} unit="원" />
        <ResultBox label="법무사비" value={lawyer} unit="원" />
        <ResultBox label="기타 등기비용" value={etc} unit="원" />
        <ResultBox
          label="총 추가 비용"
          value={totalCost}
          unit="원"
          highlight
        />
      </section>

      <section className="text-xs text-gray-500 space-y-1">
        <p>* 취득세율은 표준 단독세율 기반 단순 계산입니다.</p>
        <p>* 중개수수료는 법정 상한요율 기준 자동 계산됩니다.</p>
      </section>
    </div>
  );
}
