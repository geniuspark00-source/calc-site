import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // 🔹 1) calculators 디렉토리 위치
  const calculatorsDir = path.join(process.cwd(), "app", "calculators");

  // 🔹 2) calculators 디렉토리의 .tsx 파일 목록 읽기
  let pages: string[] = [];
  try {
    const files = fs.readdirSync(calculatorsDir);
    pages = files
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.replace(".tsx", ""));
  } catch (error) {
    console.error("RSS 생성 중 폴더 읽기 오류:", error);
  }

  // 🔹 3) RSS <item> 자동 생성
  const items = pages
    .map((page) => {
      return `
      <item>
        <title>${page} 계산기</title>
        <link>https://calc-site-delta.vercel.app/calculators/${page}</link>
        <description>${page} 계산기 페이지</description>
      </item>`;
    })
    .join("");

  // 🔹 4) RSS 전체 XML
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Calc Site RSS</title>
      <link>https://calc-site-delta.vercel.app</link>
      <description>실생활 계산기 RSS 자동 피드</description>

      ${items}
    </channel>
  </rss>
  `;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
