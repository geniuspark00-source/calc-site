#!/usr/bin/env node

/**
 * Calc Site - Calculator Auto Generator (빈 UI 버전)
 * 2025 안정화 버전
 *
 * 기능:
 * - slug 기반 폴더 생성
 * - page.tsx 자동 생성 (SEO 자동화 포함)
 * - {slug}CalculatorUI.tsx 빈 파일 생성
 * - {slug}Card.tsx 카드 파일 생성
 * - registry.ts 자동 등록
 *
 * 홈(page.tsx)은 절대 수정하지 않음
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 현재 경로 계산
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 슬러그 입력
const slug = process.argv[2];

if (!slug) {
  console.error("❌ 사용법: node create-calculator.js {slug}");
  process.exit(1);
}

console.log(`\n🚀 계산기 생성 시작: ${slug}\n`);

// 경로 설정
const calculatorDir = path.join(
  __dirname,
  "app",
  "calculators",
  slug
);

const uiFile = path.join(calculatorDir, `${slug}CalculatorUI.tsx`);
const pageFile = path.join(calculatorDir, "page.tsx");
const cardFile = path.join(
  __dirname,
  "components",
  "cards",
  `${slug}Card.tsx`
);

const registryFile = path.join(
  __dirname,
  "components",
  "calculators",
  "registry.ts"
);

// 1. 계산기 폴더 생성
if (!fs.existsSync(calculatorDir)) {
  fs.mkdirSync(calculatorDir, { recursive: true });
  console.log(`📁 생성됨: ${calculatorDir}`);
} else {
  console.log(`⚠️ 이미 존재: ${calculatorDir}`);
}

// 2. page.tsx 생성 (SEO 자동화)
const pageContent = `import { generateCalculatorSEOTags } from "@/lib/seo";
export const metadata = generateCalculatorSEOTags("${slug}");

import ${slug}CalculatorUI from "./${slug}CalculatorUI";

export default function Page() {
  return <${slug}CalculatorUI />;
}
`;

fs.writeFileSync(pageFile, pageContent);
console.log(`📝 생성됨: ${pageFile}`);

// 3. 빈 UI 파일 생성
const uiContent = `"use client";

export default function ${slug
  .replace(/(^\w|-\w)/g, (c) => c.replace("-", "").toUpperCase())}CalculatorUI() {
  return <div></div>;
}
`;

fs.writeFileSync(uiFile, uiContent);
console.log(`📝 생성됨: ${uiFile}`);

// 4. Card 생성
const cardContent = `import Link from "next/link";

export default function ${slug
  .replace(/(^\w|-\w)/g, (c) => c.replace("-", "").toUpperCase())}Card() {
  return (
    <Link
      href="/calculators/${slug}"
      className="block border rounded-xl p-4 hover:bg-gray-50 transition"
    >
      <h3 className="font-semibold text-lg">${slug} 계산기</h3>
      <p className="text-sm text-gray-600">계산기 설명을 추가해주세요.</p>
    </Link>
  );
}
`;

fs.writeFileSync(cardFile, cardContent);
console.log(`📝 생성됨: ${cardFile}`);

// 5. registry.ts에 자동 추가
if (!fs.existsSync(registryFile)) {
  console.error("❌ registry.ts 파일이 없습니다. 먼저 생성해주세요.");
  process.exit(1);
}

let registryContent = fs.readFileSync(registryFile, "utf-8");

// 중복 등록 방지
if (!registryContent.includes(`slug: "${slug}"`)) {
  const insert = `\n  {\n    slug: "${slug}",\n    name: "${slug} 계산기",\n    Card: require("../cards/${slug}Card").default,\n  },\n`;

  registryContent = registryContent.replace(
    "export const calculatorCards: CalculatorCardItem[] = [",
    `export const calculatorCards: CalculatorCardItem[] = [${insert}`
  );

  fs.writeFileSync(registryFile, registryContent);

  console.log(`🔗 registry.ts에 등록 완료`);
} else {
  console.log(`⚠️ registry.ts 이미 등록됨`);
}

console.log(`\n🎉 생성 완료! /calculators/${slug} 계산기가 준비되었습니다.\n`);
