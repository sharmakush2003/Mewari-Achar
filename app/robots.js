export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/temp-system/'],
    },
    sitemap: 'https://www.mewari-achar.shop/sitemap.xml',
  }
}
