"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

// 근로소득공제 (총급여 = 연봉 기준)
function calcEarnedIncomeDeduction(totalSalary: number): number {
  if (totalSalary <= 5_000_000) {
    return totalSalary * 0.7;
  } else if (totalSalary <= 15_000_000) {
    return 3_500_000 + (totalSalary - 5_000_000) * 0.4;
  } else if (totalSalary <= 45_000_000) {
    return 7_500_000 + (totalSalary - 15_000_000) * 0.15;
  } else if (totalSalary <= 100_000_000) {
    return 12_000_000 + (totalSalary - 45_000_000) * 0.05;
  } else {
    const deduction = 14_750_000 + (totalSalary - 100_000_000) * 0.02;
    return Math.min(deduction, 20_000_000); // 공제 한도 2,000만원
  }
}

// 종합소득세 산출세액 (근로소득 과세표준 기준, 연 단위)
function calcIncomeTaxByBracket(taxBase: number): number {
  if (taxBase <= 0) return 0;

  if (taxBase <= 14_000_000) {
    return taxBase * 0.06;
  } else if (taxBase <= 50_000_000) {
    return 840_000 + (taxBase - 14_000_000) * 0.15;
  } else if (taxBase <= 88_000_000) {
    return 6_240_000 + (taxBase - 50_000_000) * 0.24;
  } else if (taxBase <= 150_000_000) {
    return 15_360_000 + (taxBase - 88_000_000) * 0.35;
  } else if (taxBase <= 300_000_000) {
    return 37_060_000 + (taxBase - 150_000_000) * 0.38;
  } else if (taxBase <= 500_000_000) {
    return 94_060_000 + (taxBase - 300_000_000) * 0.4;
  } else if (taxBase <= 1_000_000_000) {
    return 174_060_000 + (taxBase - 500_000_000) * 0.42;
  } else {
    return 384_060_000 + (taxBase - 1_000_000_000) * 0.45;
  }
}

// 근로소득세액공제 (간단 버전, 한도 반영)
function calcEarnedIncomeTaxCredit(
  incomeTax: number,
  totalSalary: number
): number {
  if (incomeTax <= 0) return 0;

  // 1단계: 산출세액 기준 공제율
  let credit = 0;
  if (incomeTax <= 1_300_000) {
    credit = incomeTax * 0.55;
  } else {
    credit = 715_000 + (incomeTax - 1_300_000) * 0.3;
  }

  // 2단계: 총급여 기준 공제 한도
  let limit = 0;
  if (totalSalary <= 33_000_000) {
    limit = 740_000;
  } else if (totalSalary <= 70_000_000) {
    limit = 740_000 - (totalSalary - 33_000_000) * 0.008;
    if (limit < 660_000) limit = 660_000;
  } else if (totalSalary <= 120_000_000) {
    limit = 660_000 - (totalSalary - 70_000_000) * 0.5;
    if (limit < 500_000) limit = 500_000;
  } else {
    limit = 500_000 - (totalSalary - 120_000_000) * 0.5;
    if (limit < 200_000) limit = 200_000;
  }

  credit = Math.min(credit, limit);
  credit = Math.min(credit, incomeTax); // 세액보다 많이 깎을 수는 없음

  return Math.max(0, credit);
}

// 인적공제 (아주 단순화: 1인당 150만원)
function calcPersonalDeduction(personCount: number): number {
  const perPerson = 1_500_000;
  return perPerson * personCount;
}

export default function SalaryCalculatorUI() {
  const [salary, setSalary] = useState(0); // 연봉(총급여 가정)
  const [familyCount, setFamilyCount] = useState(1); // 본인 포함 인원 수

  const yearlySalary = Math.max(0, salary);
  const monthlySalary = yearlySalary / 12;

  // 4대보험 (직장인, 근로자 부담만)
  // 국민연금: 기준소득월액 390,000 ~ 6,170,000 (2024/7 기준 근로자 4.5%)
  const pensionBase = Math.min(
    Math.max(monthlySalary, 390_000),
    6_170_000
  );
  const nationalPension = pensionBase * 0.045;

  // 건강보험 (근로자 3.545%), 장기요양(건보료의 12.95%), 고용보험(0.9%)
  const healthInsurance = monthlySalary * 0.03545;
  const longTermCare = healthInsurance * 0.1295;
  const employmentInsurance = monthlySalary * 0.009;

  const monthlySocialInsurance =
    nationalPension + healthInsurance + longTermCare + employmentInsurance;

  const yearlySocialInsurance = monthlySocialInsurance * 12;

  // 소득세 계산용 과세표준
  const earnedIncomeDeduction = calcEarnedIncomeDeduction(yearlySalary);
  const earnedIncomeAmount = Math.max(
    0,
    yearlySalary - earnedIncomeDeduction
  ); // 근로소득금액

  const personalDeduction = calcPersonalDeduction(
    Math.max(1, Math.floor(familyCount || 1))
  );

  const taxBase = Math.max(
    0,
    earnedIncomeAmount - personalDeduction
  );

  const grossIncomeTax = calcIncomeTaxByBracket(taxBase);
  const taxCredit = calcEarnedIncomeTaxCredit(grossIncomeTax, yearlySalary);
  const finalIncomeTax = Math.max(0, grossIncomeTax - taxCredit);

  const localIncomeTax = finalIncomeTax * 0.1; // 지방소득세 10%
  const yearlyTaxTotal = finalIncomeTax + localIncomeTax;
  const monthlyTaxTotal = yearlyTaxTotal / 12;

  const monthlyTakeHome =
    monthlySalary - monthlySocialInsurance - monthlyTaxTotal;

  return (
    <div className="max-w-xl mx-auto p-4">
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        연봉 → 실수령액 계산기 (정밀 버전)
      </h1>

      <p className="text-gray-600 mb-2 leading-relaxed">
        연봉과 부양가족 수를 기준으로 4대보험, 소득세, 지방소득세를
        계산하여 실제 월 실수령액을 추정합니다.
      </p>
      <p className="text-xs text-gray-500 mb-6">
        ※ 실제 연말정산 결과와는 <span className="font-semibold">조금 차이</span>가 날 수 있으며,
        기본공제·표준적인 조건만 반영한 <span className="font-semibold">참고용 계산기</span>입니다.
      </p>

      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        <Input
          label="연봉 (총급여, 원)"
          value={salary}
          onChange={setSalary}
        />
        <Input
          label="인적공제 인원수 (본인 포함)"
          value={familyCount}
          onChange={setFamilyCount}
        />
      </div>

      <ResultBox title="📌 월 실수령액 요약">
        <p>
          월 급여(연봉 ÷ 12):{" "}
          <strong>{Math.round(monthlySalary).toLocaleString()} 원</strong>
        </p>
        <p>
          월 4대보험 합계:{" "}
          <strong>
            {Math.round(monthlySocialInsurance).toLocaleString()} 원
          </strong>
        </p>
        <p>
          월 소득세+지방소득세(추정):{" "}
          <strong>
            {Math.round(monthlyTaxTotal).toLocaleString()} 원
          </strong>
        </p>

        <hr className="my-3" />

        <p>
          월 실수령액(추정):{" "}
          <strong className="text-green-700 text-xl">
            {Math.round(monthlyTakeHome).toLocaleString()} 원
          </strong>
        </p>
      </ResultBox>

      <ResultBox title="📊 연간 상세 내역">
        <p>
          근로소득공제:{" "}
          <strong>
            {Math.round(earnedIncomeDeduction).toLocaleString()} 원
          </strong>
        </p>
        <p>
          인적공제(추정):{" "}
          <strong>
            {Math.round(personalDeduction).toLocaleString()} 원
          </strong>
        </p>
        <p>
          과세표준(연):{" "}
          <strong>{Math.round(taxBase).toLocaleString()} 원</strong>
        </p>

        <p className="mt-3">
          소득세 산출세액(연):{" "}
          <strong>
            {Math.round(grossIncomeTax).toLocaleString()} 원
          </strong>
        </p>
        <p>
          근로소득세액공제:{" "}
          <strong>
            {Math.round(taxCredit).toLocaleString()} 원
          </strong>
        </p>
        <p>
          결정세액(연, 국세):{" "}
          <strong>
            {Math.round(finalIncomeTax).toLocaleString()} 원
          </strong>
        </p>
        <p>
          지방소득세(연):{" "}
          <strong>
            {Math.round(localIncomeTax).toLocaleString()} 원
          </strong>
        </p>
        <p>
          소득세+지방세 합계(연):{" "}
          <strong>
            {Math.round(yearlyTaxTotal).toLocaleString()} 원
          </strong>
        </p>

        <hr className="my-3" />

        <p>
          4대보험(연, 근로자 부담):{" "}
          <strong>
            {Math.round(yearlySocialInsurance).toLocaleString()} 원
          </strong>
        </p>
      </ResultBox>
    </div>
  );
}
