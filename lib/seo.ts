// =============================
// 🟦 공통 SEO 생성 함수
// =============================
export function generateSEOTagsForHome({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

// =============================
// 🟦 계산기 SEO 자동 생성 함수
// =============================
export function generateCalculatorSEOTags(slug: string) {
  const baseUrl = "https://calc-site-delta.vercel.app";

  return {
    title: `${slug} 계산기 | Calc Site`,
    description: `${slug} 계산기 페이지입니다.`,
    openGraph: {
      title: `${slug} 계산기 | Calc Site`,
      description: `${slug} 계산기 페이지입니다.`,
      url: `${baseUrl}/calculators/${slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/calculators/${slug}`,
    },
  };
}

// ==========================================
// 🟩 최신 규칙에 맞춘 추가 export (오류 해결 핵심 부분)
// ==========================================

// 홈 SEO 함수 이름을 generateHomeSEOTags 로도 사용할 수 있게 함
export const generateHomeSEOTags = generateSEOTagsForHome;
