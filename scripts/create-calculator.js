#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// CLI args
const slug = process.argv[2];

if (!slug) {
  console.error("❌ 슬러그를 입력해주세요. 예: node scripts/create-calculator.js rent-yield");
  process.exit(1);
}

// PascalCase 변환 함수
function toComponentName(slug) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

const ComponentName = toComponentName(slug);
const targetDir = path.join("app", "calculators", slug);

// 폴더 생성
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`📁 폴더 생성: ${targetDir}`);
}

// page.tsx 템플릿
const pageTemplate = `import { generateCalculatorSEOTags } from "@/lib/seo";
import CalculatorUI from "./${slug}CalculatorUI";

export const metadata = generateCalculatorSEOTags("${slug}");

export default function Page() {
  return <CalculatorUI />;
}
`;

// UI 자동 생성 템플릿 (2단계)
const uiTemplate = `"use client";

import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";
import { useState } from "react";

export default function ${ComponentName}CalculatorUI() {
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [rate, setRate] = useState(0);

  return (
    <div className="space-y-6">
      <Input 
        label="금액(원)" 
        value={amount} 
        onChange={setAmount} 
        placeholder="예: 1,000,000"
      />

      <Input 
        label="기간(개월)" 
        value={period} 
        onChange={setPeriod} 
        placeholder="예: 12"
      />

      <Input 
        label="이율(%)" 
        value={rate} 
        onChange={setRate} 
        placeholder="예: 5"
      />

      <ResultBox title="계산 결과">
        {/* 결과 출력 */}
      </ResultBox>
    </div>
  );
}
`;

// Card 템플릿
const cardTemplate = `import Link from "next/link";

export default function ${ComponentName}Card() {
  return (
    <Link
      href="/calculators/${slug}"
      className="block rounded-lg shadow-sm hover:shadow-md p-4 bg-white"
    >
      <p className="font-bold text-lg mb-2">${ComponentName} 계산기</p>
      <p className="text-gray-600">클릭하여 계산기로 이동</p>
    </Link>
  );
}
`;

// 파일 생성
fs.writeFileSync(path.join(targetDir, "page.tsx"), pageTemplate);
fs.writeFileSync(path.join(targetDir, `${slug}CalculatorUI.tsx`), uiTemplate);

const cardDir = path.join("components", "cards");
if (!fs.existsSync(cardDir)) {
  fs.mkdirSync(cardDir, { recursive: true });
}
fs.writeFileSync(path.join(cardDir, `${slug}Card.tsx`), cardTemplate);

console.log("✅ 계산기 3종 세트 생성 완료! (Input 자동 생성 버전)");
