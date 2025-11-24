export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Calc Site RSS</title>
      <link>https://calc-site-delta.vercel.app</link>
      <description>실생활 계산기 모음 RSS 피드</description>
      <item>
        <title>메인 페이지</title>
        <link>https://calc-site-delta.vercel.app</link>
        <description>Calc Site 메인</description>
      </item>
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml",
    },
  });
}
