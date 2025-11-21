"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function SalaryCalculatorUI() {
  const [salary, setSalary] = useState(0); // 연봉

  // 월 급여
  const monthly = salary / 12;

  // 4대보험
  const pension = monthly * 0.045; // 국민연금
  const health = monthly * 0.03545; // 건강보험
  const care = health * 0.1295; // 장기요양보험
  const hire = monthly * 0.009; // 고용보험

  const insuranceTotal = pension + health + care + hire;

  // 소득세(단순화 모델: 월급의 5.5% 정도)
  const incomeTax = monthly * 0.055;
  const localTax = incomeTax * 0.1;

  const taxTotal = incomeTax + localTax;

  // 최종 실수령액
  const takeHome = monthly - insuranceTotal - taxTotal;

  return (
    <div className="max-w-xl mx-auto p-4">
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        연봉 → 실수령액 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        연봉을 입력하면 4대보험과 세금을 계산해 실제 월 실수령액을 알려드립니다.
      </p>

      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        <Input
          label="연봉 (원)"
          value={salary}
          onChange={setSalary}
        />
      </div>

      <ResultBox title="📌 계산 결과">
        <p>
          월급(연봉÷12):{" "}
          <strong>{Math.round(monthly).toLocaleString()} 원</strong>
        </p>

        <p className="mt-4 font-semibold">4대보험 공제</p>
        <p>국민연금: {Math.round(pension).toLocaleString()} 원</p>
        <p>건강보험: {Math.round(health).toLocaleString()} 원</p>
        <p>장기요양보험: {Math.round(care).toLocaleString()} 원</p>
        <p>고용보험: {Math.round(hire).toLocaleString()} 원</p>

        <p className="mt-4 font-semibold">세금 공제</p>
        <p>소득세(간단 계산): {Math.round(incomeTax).toLocaleString()} 원</p>
        <p>지방세: {Math.round(localTax).toLocaleString()} 원</p>

        <hr className="my-3" />

        <p>
          월 실수령액:{" "}
          <strong className="text-green-700 text-xl">
            {Math.round(takeHome).toLocaleString()} 원
          </strong>
        </p>
      </ResultBox>
    </div>
  );
}
