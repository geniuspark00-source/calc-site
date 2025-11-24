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

// 현재 파일 경로 확보
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== 슬러그 입력 =====
const slug = process.argv[2];

if (!slug) {
  console.error("❌ 사용법: node create-calculator.js {slug}");
  process.exit(1);
}

console.log(`\n🚀 계산기 생성 시작: ${slug}\n`);

// ========= 절대경로 기반 폴더 설정 ==========
const calculatorsDir = path.join(__dirname, "..", "app", "calculators");
const targetDir = path.join(calculatorsDir, slug);
const cardsDir = path.join(__dirname, "..", "components", "cards");
const registryDir = path.join(__dirname, "..", "components", "calculators");
const registryFile = path.join(registryDir, "registry.ts");

// ===== 폴더 자동 생성 =====
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 폴더 생성: ${dirPath}`);
  }
}

ensureDir(targetDir);
ensureDir(cardsDir);
ensureDir(registryDir);

// ==== 슬러그 → PascalCase 변환 ====
function toComponentName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

const ComponentName = toComponentName(slug);

// ========= page.tsx 생성 =========
const pageContent = `import { generateCalculatorSEOTags } from "@/lib/seo";
export const metadata = generateCalculatorSEOTags("${slug}");

import ${ComponentName}CalculatorUI from "./${slug}CalculatorUI";

export default function Page() {
  return <${ComponentName}CalculatorUI />;
}
`;

fs.writeFileSync(path.join(targetDir, "page.tsx"), pageContent);
console.log("📝 page.tsx 생성 완료");

// ========= UI 빈 템플릿 생성 =========
const uiContent = `"use client";

export default function ${ComponentName}CalculatorUI() {
  return <div></div>;
}
`;

fs.writeFileSync(path.join(targetDir, `${slug}CalculatorUI.tsx`), uiContent);
console.log("📝 UI 파일 생성 완료");

// ========= Card 생성 =========
const cardContent = `import Link from "next/link";

export default function ${ComponentName}Card() {
  return (
    <Link
      href="/calculators/${slug}"
      className="block rounded-lg shadow-sm hover:shadow-md p-4 bg-white"
    >
      <p className="font-bold text-lg mb-2">${slug} 계산기</p>
      <p className="text-gray-600">클릭하여 계산기로 이동</p>
    </Link>
  );
}
`;

fs.writeFileSync(path.join(cardsDir, `${slug}Card.tsx`), cardContent);
console.log("📝 카드 파일 생성 완료");

// ========= registry.ts 자동 업데이트 =========
let registryContent = "";

if (!fs.existsSync(registryFile)) {
  console.log("📄 registry.ts 신규 생성");

  registryContent = `import type React from "react";
import ${ComponentName}Card from "@/components/cards/${slug}Card";

export type CalculatorCardItem = {
  slug: string;
  name: string;
  Card: React.ComponentType<any>;
};

export const calculatorCards: CalculatorCardItem[] = [
  { slug: "${slug}", name: "${slug} 계산기", Card: ${ComponentName}Card },
];
`;

  fs.writeFileSync(registryFile, registryContent);
} else {
  registryContent = fs.readFileSync(registryFile, "utf8");

  if (!registryContent.includes(`slug: "${slug}"`)) {
    // import 추가
    const importLine = `import ${ComponentName}Card from "@/components/cards/${slug}Card";\n`;
    registryContent = importLine + registryContent;

    // calculatorCards 배열에 추가
    registryContent = registryContent.replace(
      /export const calculatorCards:[\s\S]*?\[/,
      (match) => `${match}\n  { slug: "${slug}", name: "${slug} 계산기", Card: ${ComponentName}Card },`
    );

    fs.writeFileSync(registryFile, registryContent);
    console.log("🔗 registry.ts 업데이트 완료");
  } else {
    console.log("ℹ 이미 registry.ts에 등록됨");
  }
}

console.log(`\n🎉 모든 작업 완료!
생성된 계산기: /calculators/${slug}
`);
