#!/usr/bin/env node

// Calc Site 계산기 자동 생성 풀버전 스크립트
// 사용 예:
//   node scripts/create-calculator.js rent-yield --template=yield
//   node scripts/create-calculator.js loan --template=loan
//   node scripts/create-calculator.js tax-basic

const fs = require("fs");
const path = require("path");

// ===== CLI 인자 처리 =====
const rawArgs = process.argv.slice(2);

if (rawArgs.length === 0) {
  console.error("❌ 슬러그를 입력해주세요. 예: node scripts/create-calculator.js rent-yield");
  process.exit(1);
}

const slug = rawArgs[0];

// --template=xxx 형태 파싱 (기본값: basic)
let template = "basic";
for (const arg of rawArgs.slice(1)) {
  if (arg.startsWith("--template=")) {
    template = arg.split("=")[1] || "basic";
  }
}

// ===== 유틸 함수들 =====

// slug -> PascalCase 컴포넌트 이름
function toComponentName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

// slug -> 한글 이름 (SEO/카드용)
function toKoreanName(slug) {
  const map = {
    "rent-yield": "임대 수익률 계산기",
    loan: "대출 상환 계산기",
    "jeonse-to-wolse": "전세 → 월세 전환 계산기",
    "real-income": "연봉 실수령액 계산기",
  };

  if (map[slug]) return map[slug];

  // fallback: slug를 공백으로 바꾸고 뒤에 '계산기' 붙이기
  const base = slug.replace(/-/g, " ");
  return `${base} 계산기`;
}

const ComponentName = toComponentName(slug);
const displayName = toKoreanName(slug);

// ===== 폴더 경로 세팅 =====
const calculatorsDir = path.join("app", "calculators");
const targetDir = path.join(calculatorsDir, slug);
const cardsDir = path.join("components", "cards");
const registryDir = path.join("components", "calculators");
const registryFile = path.join(registryDir, "registry.ts");

// ===== 폴더 생성 =====
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 폴더 생성: ${dirPath}`);
  }
}

ensureDir(targetDir);
ensureDir(cardsDir);
ensureDir(registryDir);

// ===== 템플릿: page.tsx =====
const pageTemplate = `import { generateCalculatorSEOTags } from "@/lib/seo";
import CalculatorUI from "./${slug}CalculatorUI";

export const metadata = generateCalculatorSEOTags("${slug}");

export default function Page() {
  return <CalculatorUI />;
}
`;

// ===== 템플릿: UI (template 타입에 따라 분기) =====
function getUiTemplate(slug, ComponentName, displayName, template) {
  if (template === "loan") {
    return `"use client";

import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";
import { useState } from "react";

export default function ${ComponentName}CalculatorUI() {
  const [principal, setPrincipal] = useState(0);
  const [months, setMonths] = useState(0);
  const [rate, setRate] = useState(0);

  // TODO: 여기서 대출 상환 계산 로직을 구현하세요.
  // const monthlyPay = ...
  // const totalInterest = ...
  // const totalPay = ...

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 mb-2">${displayName}</h1>

      <Input
        label="대출 원금(원)"
        value={principal}
        onChange={setPrincipal}
        placeholder="예: 100,000,000"
      />

      <Input
        label="기간(개월)"
        value={months}
        onChange={setMonths}
        placeholder="예: 240"
      />

      <Input
        label="연 이자율(%)"
        value={rate}
        onChange={setRate}
        placeholder="예: 4"
      />

      <ResultBox
        title="계산 결과"
        results={[
          { label: "총 상환금액", value: "0 원", highlight: true },
          { label: "월 상환금", value: "0 원" },
          { label: "총 이자", value: "0 원" },
        ]}
      />
    </div>
  );
}
`;
  }

  if (template === "yield") {
    return `"use client";

import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";
import { useState } from "react";

export default function ${ComponentName}CalculatorUI() {
  const [price, setPrice] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [loanRate, setLoanRate] = useState(0);

  // TODO: 여기서 임대 수익률 계산 로직을 구현하세요.
  // const yearlyRent = monthly * 12;
  // const netIncome = ...
  // const yieldPercent = ...

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 mb-2">${displayName}</h1>

      <Input
        label="매입가(원)"
        value={price}
        onChange={setPrice}
        placeholder="예: 300,000,000"
      />

      <Input
        label="보증금(원)"
        value={deposit}
        onChange={setDeposit}
        placeholder="예: 10,000,000"
      />

      <Input
        label="월세(원)"
        value={monthly}
        onChange={setMonthly}
        placeholder="예: 1,000,000"
      />

      <Input
        label="대출 이자율(%)"
        value={loanRate}
        onChange={setLoanRate}
        placeholder="예: 4"
      />

      <ResultBox
        title="계산 결과"
        results={[
          { label: "연 임대수익", value: "0 원", highlight: true },
          { label: "총 투자금", value: "0 원" },
          { label: "수익률", value: "0 %"},
        ]}
      />
    </div>
  );
}
`;
  }

  // 기본 템플릿 (basic)
  return `"use client";

import Input from "@/components/Input";
import ResultBox from "@/components/ResultBox";
import { useState } from "react";

export default function ${ComponentName}CalculatorUI() {
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [rate, setRate] = useState(0);

  // TODO: 여기서 이 계산기에 맞는 로직을 구현하세요.
  // 예: 금액/기간/이율 기반 계산

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 mb-2">${displayName}</h1>

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

      <ResultBox
        title="계산 결과"
        results={[
          { label: "총 금액", value: "0 원", highlight: true },
          { label: "월 금액", value: "0 원" },
          { label: "기타 지표", value: "0" },
        ]}
      />
    </div>
  );
}
`;
}

const uiTemplate = getUiTemplate(slug, ComponentName, displayName, template);

// ===== 템플릿: Card 컴포넌트 =====
const cardTemplate = `import Link from "next/link";

export default function ${ComponentName}Card() {
  return (
    <Link
      href="/calculators/${slug}"
      className="block rounded-lg shadow-sm hover:shadow-md p-4 bg-white"
    >
      <p className="font-bold text-lg mb-2">${displayName}</p>
      <p className="text-gray-600">클릭하여 계산기로 이동</p>
    </Link>
  );
}
`;

// ===== 파일 생성: page.tsx / UI / Card =====
fs.writeFileSync(path.join(targetDir, "page.tsx"), pageTemplate);
fs.writeFileSync(path.join(targetDir, `${slug}CalculatorUI.tsx`), uiTemplate);
fs.writeFileSync(path.join(cardsDir, `${slug}Card.tsx`), cardTemplate);

console.log("✅ 계산기 3종 세트 생성 완료! (page.tsx + UI + Card)");

// ===== registry.ts 업데이트 (홈/목록 자동 등록용) =====
function updateRegistry() {
  const importLine = `import ${ComponentName}Card from "@/components/cards/${slug}Card";`;
  const newItemLine = `  { slug: "${slug}", name: "${displayName}", Card: ${ComponentName}Card },`;

  if (!fs.existsSync(registryFile)) {
    // 최초 생성
    const initial = `${importLine}

export type CalculatorCardItem = {
  slug: string;
  name: string;
  Card: React.ComponentType<any>;
};

export const calculatorCards: CalculatorCardItem[] = [
${newItemLine}
];
`;
    // React 타입을 위해 최소한의 선언 추가
    const withReactImport = `import type React from "react";\n` + initial;
    fs.writeFileSync(registryFile, withReactImport);
    console.log("📄 registry.ts 최초 생성 및 등록 완료");
    return;
  }

  // 기존 파일 업데이트
  let content = fs.readFileSync(registryFile, "utf8");

  // 이미 등록되어 있으면 스킵
  if (content.includes(`slug: "${slug}"`)) {
    console.log("ℹ registry.ts에 이미 이 슬러그가 등록되어 있습니다. (중복 등록 안 함)");
    return;
  }

  // import 추가 (마지막 import 뒤에 삽입)
  if (!content.includes(importLine)) {
    const importMatch = content.match(/(import[\s\S]+?;)/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      content = content.replace(lastImport, `${lastImport}\n${importLine}`);
    } else {
      content = `${importLine}\n` + content;
    }
  }

  // calculatorCards 배열에 항목 추가
  if (content.includes("export const calculatorCards")) {
    content = content.replace(
      /export const calculatorCards[^{]*\[\s*([\s\S]*?)\];/,
      (match, p1) => {
        const trimmed = p1.trim();
        const hasItems = trimmed.length > 0;
        const newItems = hasItems ? `${p1}\n${newItemLine}\n` : `\n${newItemLine}\n`;
        return `export const calculatorCards: CalculatorCardItem[] = [${newItems}];`;
      }
    );
  } else {
    // calculatorCards 선언이 없으면 새로 만든다
    content += `

export type CalculatorCardItem = {
  slug: string;
  name: string;
  Card: React.ComponentType<any>;
};

export const calculatorCards: CalculatorCardItem[] = [
${newItemLine}
];
`;
  }

  fs.writeFileSync(registryFile, content);
  console.log("✅ registry.ts 업데이트 완료 (메인/목록용 카드 자동 등록)");
}

updateRegistry();

console.log(`🎉 모든 작업 완료!
- 슬러그: ${slug}
- 템플릿: ${template}
- 컴포넌트 이름: ${ComponentName}CalculatorUI / ${ComponentName}Card
`);
