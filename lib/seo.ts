// /lib/seo.ts

export function generateCalculatorSEOTags(slug: string) {
  // 슬러그 기반 title 자동 생성
  const titleMap: Record<string, string> = {
    "rent-yield": "임대 수익률 계산기",
    "loan": "대출 상환 계산기",
    "aircon-estimate": "에어컨 설치비 계산기",
    "wedding-cost": "결혼 비용 계산기",
  };

  const descriptionMap: Record<string, string> = {
    "rent-yield": "매입가, 보증금, 월세 등을 입력하면 자동으로 임대 수익률을 계산합니다.",
    "loan": "원리금균등 · 원금균등 · 만기일시 방식 대출 상환금 계산기.",
    "aircon-estimate": "벽걸이/스탠드 에어컨 설치 비용을 자동으로 계산합니다.",
    "wedding-cost": "예식장, 스튜디오, 드레스, 메이크업 비용을 포함한 결혼 총 비용 계산기.",
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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: "https://calc-site-delta.vercel.app" },
            { "@type": "ListItem", position: 2, name: "계산기", item: "https://calc-site-delta.vercel.app/calculators" },
            { "@type": "ListItem", position: 3, name: title, item: url },
          ],
        },
      }),
    },
  };
}
