/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://calc-site-delta.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // app router 시즌에서도 자동으로 페이지 추적
  exclude: ["/api/*"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
