const fs = require('fs');
const path = require('path');

const siteUrl = 'https://vertxdroneshow.in';

// Define static routes with changefreq and priority
const staticRoutes = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: 'portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: 'corporate', changefreq: 'weekly', priority: '0.8' },
  { path: 'weddings', changefreq: 'weekly', priority: '0.8' },
  { path: 'design', changefreq: 'monthly', priority: '0.7' },
  { path: 'about', changefreq: 'monthly', priority: '0.6' },
  { path: 'partners', changefreq: 'monthly', priority: '0.6' },
  { path: 'blog', changefreq: 'daily', priority: '0.8' },
  { path: 'contact', changefreq: 'monthly', priority: '0.5' },
];

console.log('Generating sitemap...');

try {
  // Read and parse dynamic blog posts from src/data/blogData.tsx
  const blogDataPath = path.join(__dirname, '../src/data/blogData.tsx');
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
  
  // Regex to extract slug property values
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const blogRoutes = [];
  let match;
  
  while ((match = slugRegex.exec(blogDataContent)) !== null) {
    const slug = match[1];
    blogRoutes.push({
      path: `blog/${slug}`,
      changefreq: 'weekly',
      priority: '0.7'
    });
  }

  console.log(`Found ${blogRoutes.length} blog posts.`);

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...blogRoutes];

  // Build the XML string
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  allRoutes.forEach((route) => {
    const url = route.path ? `${siteUrl}/${route.path}` : `${siteUrl}/`;
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  // Write to public/sitemap.xml
  const publicPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');
  console.log(`Sitemap written to public/sitemap.xml`);

  // Write to dist/sitemap.xml (if dist directory exists)
  const distDir = path.join(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    const distPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distPath, xml, 'utf8');
    console.log(`Sitemap written to dist/sitemap.xml`);
  }

  console.log('Sitemap generation completed successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
