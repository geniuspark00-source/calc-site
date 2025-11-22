"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function GasHeatingCalculatorUI() {
  const regions = {
    서울: { unitPrice: 89, baseFee: 1450 },
    경기: { unitPrice: 85, baseFee: 1600 },
    인천: { unitPrice: 95, baseFee: 1550 },
    부산: { unitPrice: 87, baseFee: 1450 },
    대구: { unitPrice: 88, baseFee: 1500 },
    광주: { unitPrice: 86, baseFee: 1550 },
    대전: { unitPrice: 90, baseFee: 1500 },
    울산: { unitPrice: 88, baseFee: 1450 },
    강원: { unitPrice: 92, baseFee: 1600 },
    제주: { unitPrice: 97, baseFee: 1700 },
  };

  const [region, setRegion] = useState("서울");
  const [kwh, setKwh] = useState(500); // 월 사용량 (kWh)
  const [unitPrice, setUnitPrice] = useState(regions["서울"].unitPrice);
  const [baseFee, setBaseFee] = useState(regions["서울"].baseFee);
  const [includeVAT, setIncludeVAT] = useState(true);

  // 지역 변경 시 자동 단가 & 기본요금 반영
  const changeRegion = (value: string) => {
    setRegion(value);
    setUnitPrice(regions[value].unitPrice);
    setBaseFee(regions[value].baseFee);
  };

  // kWh → ㎥ 변환 (1㎥ = 11.2kWh)
  const m3 = kwh / 11.2;

  // 사용요금 계산
  // 단가: 원/kWh 라고 가정
  const usageCost = kwh * unitPrice;

  const subtotal = usageCost + baseFee;
  const vat = includeVAT ? subtotal * 0.1 : 0;
  const total = subtotal + vat;

  const format = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 입력 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        
        <div>
          <label className="text-sm font-bold">지역 선택</label>
          <select
            value={region}
            onChange={(e) => changeRegion(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            {Object.keys(regions).map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <Input
          label="월 사용량 (kWh)"
          value={kwh}
          onChange={setKwh}
        />

        <Input
          label="단가 (원/kWh)"
          value={unitPrice}
          onChange={setUnitPrice}
        />

        <Input
          label="기본요금 (원)"
          value={baseFee}
          onChange={setBaseFee}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeVAT}
            onChange={(e) => setIncludeVAT(e.target.checked)}
          />
          <label className="text-sm">부가세 10% 포함</label>
        </div>
      </div>

      {/* 결과 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-blue-700">난방비 계산 결과</h2>

        <p>월 사용량: <strong>{format(kwh)} kWh</strong></p>
        <p>환산 사용량: <strong>{m3.toFixed(1)} ㎥</strong></p>

        <p>사용요금: <strong>{format(usageCost)} 원</strong></p>
        <p>기본요금: <strong>{format(baseFee)} 원</strong></p>
        <p>부가세: <strong>{format(vat)} 원</strong></p>

        <p className="text-xl font-bold text-red-600">
          총 난방비: {format(total)} 원
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        ※ 실제 요금은 도시가스사 조정요금에 따라 다를 수 있습니다.
      </p>
    </div>
  );
}
