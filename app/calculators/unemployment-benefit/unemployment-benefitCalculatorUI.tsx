"use client";

import { useState } from "react";
import Input from "@/components/Input";

export default function UnemploymentBenefitCalculatorUI() {
  const [avgWage, setAvgWage] = useState(2000000); // 월 평균임금
  const [workMonths, setWorkMonths] = useState(24); // 근속 개월
  const [age, setAge] = useState(30);

  // ===== 실업급여 기본 로직 =====

  // 1일 실업급여 = 평균임금의 60%
  let dailyBenefit = (avgWage / 30) * 0.6;

  // ===== 법정 상/하한 적용 =====
  const DAILY_MAX = 72000;

  // ⚠ 2025년 최저임금 = 10,030원
  // 공식 하한액 = 최저임금 × 8시간 × 0.8
  const DAILY_MIN = 10030 * 8 * 0.8; // = 64,192원

  dailyBenefit = Math.min(DAILY_MAX, Math.max(DAILY_MIN, dailyBenefit));

  // ===== 지급일수 계산 =====
  let benefitDays = 0;

  if (workMonths < 12) benefitDays = 120;
  else if (workMonths < 24) benefitDays = 150;
  else if (workMonths < 36) benefitDays = 180;
  else if (workMonths < 48) benefitDays = 210;
  else benefitDays = 240;

  // 나이 따른 지급일수 추가
  if (age >= 50) benefitDays += 30;
  if (age >= 60) benefitDays += 30;

  // ===== 세금 계산 (3.3% 공제) =====
  const taxRate = 0.033;
  const dailyAfterTax = dailyBenefit * (1 - taxRate);

  const totalBeforeTax = dailyBenefit * benefitDays;
  const totalAfterTax = dailyAfterTax * benefitDays;

  // ===== 월별 수령액 계산 (30일 단위) =====
  const monthlyBreakdown: number[] = [];
  let remain = benefitDays;

  while (remain > 0) {
    const days = Math.min(30, remain);
    monthlyBreakdown.push(dailyAfterTax * days);
    remain -= days;
  }

  const format = (n: number) =>
    n.toLocaleString("ko-KR", {
      maximumFractionDigits: 0,
    });

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* 돌아가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <p className="text-gray-600 mb-6 leading-relaxed">
        실업급여는 평균임금, 근속기간, 연령에 따라 지급일수와 지급액이 계산되며,
        <br />법정 상·하한액 및 세후 실수령액(3.3%)이 자동 반영됩니다.
      </p>

      {/* 입력 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">

        <Input
          label="월 평균임금 (원)"
          value={avgWage}
          onChange={setAvgWage}
        />

        <Input
          label="근속기간 (개월)"
          value={workMonths}
          onChange={setWorkMonths}
        />

        <Input
          label="나이"
          value={age}
          onChange={setAge}
        />
      </div>

      {/* 결과 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4">

        <h2 className="text-lg font-bold text-blue-700">실업급여 계산 결과</h2>

        <p>1일 실업급여 (세전): <strong>{format(dailyBenefit)} 원</strong></p>
        <p>1일 실수령액 (세후): <strong className="text-green-700">{format(dailyAfterTax)} 원</strong></p>
        <p>총 지급일수: <strong className="text-blue-700">{benefitDays} 일</strong></p>

        <p>총 수령액 (세전): <strong>{format(totalBeforeTax)} 원</strong></p>

        <p className="text-lg font-bold text-red-600">
          총 실수령액 (세후): {format(totalAfterTax)} 원
        </p>

        {/* 월별 상세 */}
        <div className="mt-4">
          <h3 className="font-bold text-gray-800 mb-2">월별 예상 수령액</h3>

          <ul className="text-sm space-y-1">
            {monthlyBreakdown.map((v, idx) => (
              <li key={idx}>
                • {idx + 1}개월차:{" "}
                <strong className="text-green-700">{format(v)} 원</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-[12px] text-gray-500 mt-4 leading-relaxed">
        ※ 실제 지급액은 고용보험 규정 및 최종 확정 금액에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
