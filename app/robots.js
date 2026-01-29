export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/teacher/", "/api/", "/login"],
      },
    ],
    sitemap: "https://eduqo.md/sitemap.xml",
  }
}
