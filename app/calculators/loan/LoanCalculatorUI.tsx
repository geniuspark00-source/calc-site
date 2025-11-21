"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function LoanCalculatorUI() {
  const [principal, setPrincipal] = useState(0); // 대출금액
  const [rate, setRate] = useState(4); // 연이율(%)
  const [years, setYears] = useState(20); // 기간(년)
  const [type, setType] = useState("원리금균등"); // 방식 선택

  const months = years * 12;
  const monthlyRate = rate / 100 / 12;

  let monthlyPay = 0;
  let totalInterest = 0;
  let totalPay = 0;

  // 원리금균등
  if (type === "원리금균등") {
    if (monthlyRate === 0) {
      monthlyPay = principal / months;
    } else {
      monthlyPay =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -months));
    }
    totalPay = monthlyPay * months;
    totalInterest = totalPay - principal;
  }

  // 원금균등
  if (type === "원금균등") {
    const monthlyPrincipal = principal / months;
    let interestSum = 0;

    for (let i = 0; i < months; i++) {
      const remain = principal - monthlyPrincipal * i;
      interestSum += remain * monthlyRate;
    }

    totalInterest = interestSum;
    totalPay = principal + totalInterest;
    monthlyPay = monthlyPrincipal + principal * monthlyRate; // 첫 달 기준
  }

  // 만기일시
  if (type === "만기일시") {
    monthlyPay = principal * monthlyRate; // 매달 이자만 납부
    totalInterest = monthlyPay * months;
    totalPay = principal + totalInterest;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <a href="/" className="text-blue-600 underline mb-4 inline-block">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        대출 상환 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        원리금균등, 원금균등, 만기일시 상환 방식 중 선택하여 월 상환금과 총이자, 총상환액을 계산합니다.
      </p>

      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4 mb-6">
        <Input label="대출금액(원)" value={principal} onChange={setPrincipal} />
        <Input label="연이율(%)" value={rate} onChange={setRate} />
        <Input label="기간(년)" value={years} onChange={setYears} />

        {/* 선택 박스 */}
        <label className="block text-sm font-medium text-gray-700">
          상환 방식
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option>원리금균등</option>
          <option>원금균등</option>
          <option>만기일시</option>
        </select>
      </div>

      <ResultBox title="📌 계산 결과">
        <p>
          월 상환금(첫 달 기준):{" "}
          <strong>{Math.round(monthlyPay).toLocaleString()} 원</strong>
        </p>
        <p>
          총 이자:{" "}
          <strong className="text-red-700">
            {Math.round(totalInterest).toLocaleString()} 원
          </strong>
        </p>
        <p>
          총 상환액(원금+이자):{" "}
          <strong className="text-blue-700">
            {Math.round(totalPay).toLocaleString()} 원
          </strong>
        </p>
      </ResultBox>
    </div>
  );
}
