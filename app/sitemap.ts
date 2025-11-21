export default function sitemap() {
  const baseUrl = "https://calc-site-delta.vercel.app";

  return [
    // 홈
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // 계산기들
    {
      url: `${baseUrl}/calculators/rent-yield`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/lease-to-monthly`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/property-tax`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/loan`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculators/salary`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculators/margin`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators/youtube`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
