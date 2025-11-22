"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function HealthInsuranceCalculatorUI() {
  const [type, setType] = useState("직장가입자"); // 직장 / 지역
  const [salary, setSalary] = useState(3000000); // 월급여
  const [income, setIncome] = useState(2000000); // 지역: 종합소득
  const [property, setProperty] = useState(0); // 지역: 재산과표
  const [car, setCar] = useState(0); // 지역: 자동차 과표

  // ===== 직장가입자 계산 =====
  const employerRate = 0.0709; // 2024 건강보험료율(전체)
  const longTermRate = 0.1281; // 장기요양보험료율

  const employeeInsurance = salary * employerRate * 0.5; // 근로자 부담
  const longTermInsurance = employeeInsurance * longTermRate; // 장기요양보험료
  const totalEmployee = employeeInsurance + longTermInsurance;

  // ===== 지역가입자 계산 (간단 버전) =====
  // 공식 산식은 매우 복잡 → 사용자 친화형 버전
  const incomeScore = income / 100000; // 소득 점수
  const propertyScore = property / 500000; // 재산 점수
  const carScore = car / 2000000; // 자동차 점수

  const regionScore = incomeScore + propertyScore + carScore;
  const regionFee = regionScore * 210; // 점수당 금액(2024 기준 210원)

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-700 mb-2">
        건강보험료 계산기
      </h1>

      <p className="text-gray-600 mb-4">
        직장가입자 / 지역가입자 건강보험료를 2024년 기준 보험료율로 계산합니다.
      </p>

      {/* 선택 */}
      <div>
        <label className="block text-sm font-medium mb-1">가입자 유형</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option>직장가입자</option>
          <option>지역가입자</option>
        </select>
      </div>

      {/* 직장가입자 입력 */}
      {type === "직장가입자" && (
        <div className="grid gap-4">
          <Input
            label="월 급여(원)"
            value={salary}
            onChange={setSalary}
          />
        </div>
      )}

      {/* 지역가입자 입력 */}
      {type === "지역가입자" && (
        <div className="grid gap-4">
          <Input label="연간 종합소득" value={income} onChange={setIncome} />
          <Input label="재산 과세표준" value={property} onChange={setProperty} />
          <Input label="자동차 과표(선택)" value={car} onChange={setCar} />
        </div>
      )}

      {/* 결과 */}
      {type === "직장가입자" ? (
        <ResultBox
          title="직장가입자 건강보험료"
          results={[
            { label: "건강보험료", value: `${employeeInsurance.toFixed(0)} 원` },
            { label: "장기요양보험료", value: `${longTermInsurance.toFixed(0)} 원` },
            { label: "월 부담 총액", value: `${totalEmployee.toFixed(0)} 원` },
          ]}
        />
      ) : (
        <ResultBox
          title="지역가입자 건강보험료"
          results={[
            { label: "보험료 점수", value: `${regionScore.toFixed(1)} 점` },
            { label: "월 건강보험료", value: `${regionFee.toFixed(0)} 원` },
          ]}
        />
      )}
    </div>
  );
}
