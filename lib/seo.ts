// /lib/seo.ts

export interface SeoProps {
  title: string;
  description: string;
  url?: string; // optional 처리 (기존 구조 유지)
}

// 기존 generateSEOTags(수동 방식) — 유지
export function generateSEOTags({ title, description, url }: SeoProps) {
  return {
    title,
    description,
    metadataBase: url ? new URL(url) : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ============================================================
   자동 SEO 생성 시스템 (업그레이드 버전)
   slug만 넣으면 title/description/url 자동 생성됨
   ============================================================ */

const calculatorNameMap: Record<string, string> = {
  "rent-yield": "임대 수익률 계산기",
  "loan": "대출 상환 계산기",
  "jeonse-to-wolse": "전세 → 월세 전환 계산기",
  "real-income": "연봉 실수령액 계산기",
  // 새로운 계산기 추가 시 여기 1줄만 추가하면 됨
};

function toDisplayName(slug: string): string {
  // slugMap에 있으면 그 값 사용
  if (calculatorNameMap[slug]) return calculatorNameMap[slug];

  // 없으면 slug를 자동으로 사람이 읽는 형태로 변환
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * slug 기반 자동 SEO 생성
 * 사용 예:  generateCalculatorSEOTags("rent-yield")
 */
export function generateCalculatorSEOTags(slug: string) {
  const displayName = toDisplayName(slug);
  const url = `https://calc-site-delta.vercel.app/calculators/${slug}`;

  return {
    title: `${displayName} | Calc Site`,
    description: `${displayName}를 쉽고 빠르게 계산하세요.`,
    metadataBase: new URL(url),
    openGraph: {
      title: `${displayName} | Calc Site`,
      description: `${displayName}를 쉽고 빠르게 계산하세요.`,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} | Calc Site`,
      description: `${displayName}를 쉽고 빠르게 계산하세요.`,
    },
  };
}
