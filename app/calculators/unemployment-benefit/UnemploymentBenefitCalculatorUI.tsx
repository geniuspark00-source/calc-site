"use client";

import { useState } from "react";

export default function UnemploymentBenefitCalculatorUI() {
  const [avgWage, setAvgWage] = useState(2000000); // 월 평균임금
  const [workMonths, setWorkMonths] = useState(24); // 근속 개월
  const [age, setAge] = useState(30);

  // ------ 실업급여 기본 로직 ------

  // 1일 실업급여 = 평균임금의 60%
  let dailyBenefit = (avgWage / 30) * 0.6;

  // 상/하한 적용
  const DAILY_MAX = 72000; // 1일 상한액
  const DAILY_MIN = 8000 * 8 * 0.8; // 최저임금 8천원(예시) × 8시간 × 80%

  dailyBenefit = Math.min(DAILY_MAX, Math.max(DAILY_MIN, dailyBenefit));

  // 지급일수 계산(간단 버전)
  let benefitDays = 0;

  if (workMonths < 12) {
    benefitDays = 120;
  } else if (workMonths < 24) {
    benefitDays = 150;
  } else if (workMonths < 36) {
    benefitDays = 180;
  } else if (workMonths < 48) {
    benefitDays = 210;
  } else {
    benefitDays = 240;
  }

  // 나이 가산
  if (age >= 50) benefitDays += 30;
  if (age >= 60) benefitDays += 30;

  const totalBenefit = dailyBenefit * benefitDays;

  const format = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6 leading-relaxed">
        고용보험 실업급여는 평균임금, 근속기간, 연령에 따라 지급일수와 지급액이
        결정됩니다.
      </p>

      {/* 입력 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        {/* 평균임금 */}
        <div>
          <label className="text-sm font-medium">월 평균임금 (원)</label>
          <input
            type="number"
            value={avgWage}
            onChange={(e) => setAvgWage(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        {/* 근속기간 */}
        <div>
          <label className="text-sm font-medium">근속기간 (개월)</label>
          <input
            type="number"
            value={workMonths}
            onChange={(e) => setWorkMonths(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        {/* 나이 */}
        <div>
          <label className="text-sm font-medium">나이</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

      </div>

      {/* 결과 영역 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">

        <h2 className="text-lg font-bold mb-2 text-blue-700">
          실업급여 예상 결과
        </h2>

        <p>
          1일 실업급여:{" "}
          <strong className="text-green-700">
            {format(Math.round(dailyBenefit))} 원
          </strong>
        </p>

        <p>
          총 지급일수:{" "}
          <strong className="text-blue-700">{benefitDays} 일</strong>
        </p>

        <p className="text-lg font-bold text-red-600">
          총 예상 수령액: {format(Math.round(totalBenefit))} 원
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 계산기는 편의를 위한 참고용이며, 실제 지급액은 고용노동부 산정 기준에 따라
        다를 수 있습니다.
      </p>
    </div>
  );
}
