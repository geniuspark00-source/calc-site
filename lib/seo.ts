// /lib/seo.ts

export interface SeoProps {
  title: string;
  description: string;
  url?: string; // optional로 처리하여 유연 적용
}

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
