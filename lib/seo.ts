// lib/seo.ts
type SeoProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
};

export function generateSEOTags({
  title,
  description,
  url,
  image = "https://dummyimage.com/1200x630/0a4cff/ffffff&text=Calc+Site",
}: SeoProps) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "ko_KR",
      siteName: "Calc Site",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
