// /lib/seo.ts

export function generateCalculatorSEOTags(slug: string) {
  // 슬러그 기반 title 자동 생성
  const titleMap: Record<string, string> = {
    "rent-yield": "임대 수익률 계산기",
    "loan": "대출 상환 계산기",
    "aircon-estimate": "에어컨 설치비 계산기",
    "real-income": "연봉 실수령액 계산기",
    "youtube-revenue": "유튜브 수익 계산기",
    "wedding-cost": "결혼 비용 계산기",
  };

  const descriptionMap: Record<string, string> = {
    "rent-yield": "매입가, 보증금, 월세 등을 입력하면 자동으로 임대 수익률을 계산합니다.",
    "loan": "원리금균등·원금균등·만기일시 방식 대출 상환금 계산기.",
    "aircon-estimate": "벽걸이·스탠드형 에어컨 설치 비용을 자동 계산합니다.",
    "real-income": "세전 연봉 기준 실수령액을 자동 계산합니다.",
    "youtube-revenue": "조회수·CPM 기반 유튜브 예상 수익을 계산합니다.",
    "wedding-cost": "예식장·스드메 포함 결혼 총 비용을 자동 계산합니다.",
  };

  const title = titleMap[slug] ?? "실생활 계산기";
  const description = descriptionMap[slug] ?? "다양한 실생활 계산기를 제공합니다.";

  const url = `https://calc-site-delta.vercel.app/calculators/${slug}`;
  const image = `/og/${slug}.png`;

  return {
    title,
    description,
    keywords: [title, "계산기", "calc site"],

    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },

    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url,
      }),
    },
  };
}
