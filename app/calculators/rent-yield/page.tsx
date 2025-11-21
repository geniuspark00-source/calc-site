"use client";
import { useState } from "react";
import Input from "@/components/Input";

export default function RentYieldCalculator() {
  const [price, setPrice] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [loan, setLoan] = useState(0);
  const [rate, setRate] = useState(0);
  const [manage, setManage] = useState(0);

  const monthlyLoanInterest = (loan * (rate / 100)) / 12;
  const annualIncome = (monthly - manage - monthlyLoanInterest) * 12;
  const netInvestment = price - deposit - loan;
  const yieldPercent =
    netInvestment > 0 ? (annualIncome / netInvestment) * 100 : 0;

  return (
    <div>
      {/* 뒤로가기 */}
      <a href="/" className="text-blue-600 underline mb-4 inline-block text-gray-900">
        ← 계산기 목록으로 돌아가기
      </a>

      {/* 타이틀 */}
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        임대 수익률 계산기
      </h1>

      {/* 설명 */}
      <p className="text-gray-900 mb-6">
        매입가, 보증금, 월세, 대출이자 등을 입력하면 자동으로 임대 수익률이 계산됩니다.
      </p>

      {/* 입력 폼 */}
      <div className="bg-white p-4 rounded-lg border shadow-sm space-y-4">
        <Input label="매입가" value={price} onChange={setPrice} />
        <Input label="보증금" value={deposit} onChange={setDeposit} />
        <Input label="월세" value={monthly} onChange={setMonthly} />
        <Input label="대출금" value={loan} onChange={setLoan} />
        <Input label="이자율(%)" value={rate} onChange={setRate} />
        <Input label="관리비/기타 비용" value={manage} onChange={setManage} />
      </div>

      {/* 결과 박스 */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="font-bold text-lg text-blue-700">📌 계산 결과</h2>

        <p className="text-gray-900">
          월 대출이자:{" "}
          <strong className="text-gray-900">
            {Math.round(monthlyLoanInterest).toLocaleString()} 원
          </strong>
        </p>

        <p className="text-gray-900">
          연 순수익:{" "}
          <strong className="text-gray-900">
            {Math.round(annualIncome).toLocaleString()} 원
          </strong>
        </p>

        <p className="text-gray-900">
          임대 수익률:
          <strong className="text-green-700">
            {" "}
            {yieldPercent.toFixed(2)}%
          </strong>
        </p>
      </div>
    </div>
  );
}
