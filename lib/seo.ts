// lib/seo.ts
type FAQItem = { q: string; a: string };

interface SEOParams {
  title: string;
  description: string;
  keywords?: string[];
  url?: string;
  image?: string;
  faq?: FAQItem[];
  breadcrumb?: string[];
}

export function generateSEOTags({
  title,
  description,
  keywords = [],
  url = "",
  image = "/og/default.png",
  faq = [],
  breadcrumb = [],
}: SEOParams) {
  // FAQ Schema
  const faqSchema =
    faq.length > 0
      ? {
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  // Breadcrumb Schema
  const breadcrumbSchema =
    breadcrumb.length > 0
      ? {
          "@type": "BreadcrumbList",
          itemListElement: breadcrumb.map((name, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
            item: url,
          })),
        }
      : null;

  // Metadata Object Returned to Next.js
  const metadata: any = {
    title,
    description,
    keywords,

    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // JSON-LD 삽입
    other: {},
  };

  // JSON-LD를 하나로 묶음
  const ldJson = {
    "@context": "https://schema.org",
    ...(faqSchema || {}),
    ...(breadcrumbSchema || {}),
  };

  // JSON-LD가 비어있지 않을 때만 삽입
  if (Object.keys(ldJson).length > 1) {
    metadata.other["script:ld+json"] = JSON.stringify(ldJson);
  }

  return metadata;
}
