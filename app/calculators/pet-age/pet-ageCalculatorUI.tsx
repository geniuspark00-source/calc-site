"use client";

import { useState } from "react";
import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";

export default function PetAgeCalculatorUI() {
  const [type, setType] = useState("강아지");
  const [age, setAge] = useState(1);

  const convertAge = (petAge: number) => {
    if (petAge <= 0) return 0;

    if (petAge === 1) return 15;
    if (petAge === 2) return 24;

    return 24 + (petAge - 2) * 4;
  };

  const humanAge = convertAge(age);

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <a href="/" className="text-blue-600 underline inline-block mb-3">
        ← 계산기 목록으로 돌아가기
      </a>

      <h1 className="text-2xl font-bold text-blue-700">
        강아지·고양이 사람 나이 환산 계산기
      </h1>

      <p className="text-gray-600 mb-6">
        반려동물의 나이를 사람 나이로 간단하게 환산해보세요.
      </p>

      {/* 유형 선택 */}
      <div className="grid gap-4">
        <label className="block text-sm font-medium">동물 종류</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option>강아지</option>
          <option>고양이</option>
        </select>

        <Input label={`${type} 실제 나이(년)`} value={age} onChange={setAge} />
      </div>

      {/* 결과 */}
      <ResultBox
        title="사람 나이로 환산"
        results={[
          { label: `${type} 나이`, value: `${age} 년` },
          { label: "사람 나이로 환산", value: `${humanAge} 세` },
        ]}
      />
    </div>
  );
}
