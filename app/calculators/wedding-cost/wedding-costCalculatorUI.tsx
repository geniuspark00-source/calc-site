"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function WeddingCostCalculatorUI() {
  const [guests, setGuests] = useState(0); // 하객 수
  const [mealCost, setMealCost] = useState(0); // 1인당 식대
  const [studio, setStudio] = useState(0); // 스튜디오·드레스·메이크업(S·D·M)
  const [hall, setHall] = useState(0); // 웨딩홀 대관료
  const [extra, setExtra] = useState(0); // 부대비용(한복, 메이크업추가, 폐백 등)
  const [honeymoon, setHoneymoon] = useState(0); // 허니문 비용
  const [others, setOthers] = useState(0); // 기타 비용

  // ===== 계산 =====
  const mealTotal = guests * mealCost; // 식대 총액
  const weddingDayCost = mealTotal + hall; // 예식 당일 비용
  const preparationCost = studio + extra + others; // 준비 비용(스드메+부대비)
  const grandTotal = weddingDayCost + preparationCost + honeymoon; // 최종 전체 비용

  return (
    <div className="space-y-6">
<a href="/" className="text-blue-600 underline inline-block mb-3">
  ← 계산기 목록으로 돌아가기
</a>

      <h1 className="text-xl font-bold text-gray-900 mb-2">
        💍 결혼 비용 계산기
      </h1>

      {/* 하객 관련 */}
      <Input
        label="하객 수(명)"
        value={guests}
        onChange={setGuests}
        placeholder="예: 200"
      />

      <Input
        label="1인당 식대(원)"
        value={mealCost}
        onChange={setMealCost}
        placeholder="예: 60,000"
      />

      {/* 준비 비용 */}
      <Input
        label="스튜디오·드레스·메이크업(S·D·M) 비용(원)"
        value={studio}
        onChange={setStudio}
        placeholder="예: 2,000,000"
      />

      <Input
        label="웨딩홀 대관료(원)"
        value={hall}
        onChange={setHall}
        placeholder="예: 3,000,000"
      />

      <Input
        label="부대비용(한복·폐백·메이크업 추가 등)"
        value={extra}
        onChange={setExtra}
        placeholder="예: 1,000,000"
      />

      <Input
        label="허니문(신혼여행) 비용(원)"
        value={honeymoon}
        onChange={setHoneymoon}
        placeholder="예: 3,000,000"
      />

      <Input
        label="기타 비용(원)"
        value={others}
        onChange={setOthers}
        placeholder="예: 500,000"
      />

      {/* 결과 출력 */}
      <ResultBox
        title="결혼 비용 계산 결과"
        results={[
          { label: "식대 총액", value: mealTotal.toLocaleString() + " 원" },
          {
            label: "예식 당일 비용 (식대 + 대관료)",
            value: weddingDayCost.toLocaleString() + " 원",
          },
          {
            label: "준비 비용 (스드메 + 부대비 + 기타)",
            value: preparationCost.toLocaleString() + " 원",
          },
          {
            label: "최종 결혼 비용 (허니문 포함)",
            value: grandTotal.toLocaleString() + " 원",
            highlight: true,
          },
        ]}
      />
    </div>
  );
}
