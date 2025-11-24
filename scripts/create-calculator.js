#!/usr/bin/env node

// Node.js 파일 자동 생성 스크립트
// 사용법:  node scripts/create-calculator.js rent-yield

const fs = require("fs");
const path = require("path");

const slug = process.argv[2];

if (!slug) {
  console.error("❌ 슬러그를 입력해주세요. 예: node create-calculator.js rent-yield");
  process.exit(1);
}

const targetDir = path.join("app", "calculators", slug);

// 폴더 생성
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`📁 폴더 생성: ${targetDir}`);
}

// 파일 템플릿
const pageTemplate = `import { generateCalculatorSEOTags } from "@/lib/seo";
import CalculatorUI from "./${slug}CalculatorUI";

export const metadata = generateCalculatorSEOTags("${slug}");

export default function Page() {
  return <CalculatorUI />;
}
`;

const uiTemplate = `"use client";

import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";
import { useState } from "react";

export default function ${slug.replace(/-/g, "")}CalculatorUI() {
  return (
    <div className="space-y-6">
      {/* 여기서 Input + 계산 로직 작성 */}
      <ResultBox title="계산 결과">
        {/* 결과 출력 */}
      </ResultBox>
    </div>
  );
}
`;

const cardTemplate = `import Link from "next/link";

export default function ${slug.replace(/-/g, "")}Card() {
  return (
    <Link
      href="/calculators/${slug}"
      className="block rounded-lg shadow-sm hover:shadow-md p-4 bg-white"
    >
      <p className="font-bold text-lg mb-2">계산기: ${slug}</p>
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

console.log("✅ 계산기 3종 세트 생성 완료!");
