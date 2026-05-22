const fs = require('fs');
const path = require('path');

const siteUrl = 'https://vertxdroneshow.in';

console.log('Generating dynamic sitemap...');

try {
  // 1. Read and parse routes from src/App.tsx
  const appPath = path.join(__dirname, '../src/App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');

  // Regex to match <Route path="something" ... /> or <Route path='something' ... />
  const routeRegex = /<Route\s+[^>]*\bpath=["']([^"']+)["']/g;
  const foundPaths = [];
  let routeMatch;

  while ((routeMatch = routeRegex.exec(appContent)) !== null) {
    foundPaths.push(routeMatch[1]);
  }

  console.log(`Found routes in App.tsx:`, foundPaths);

  // 2. Read and parse dynamic blog posts from src/data/blogData.tsx
  const blogDataPath = path.join(__dirname, '../src/data/blogData.tsx');
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
  
  // Regex to extract slug property values from blogData
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const blogSlugs = [];
  let slugMatch;
  
  while ((slugMatch = slugRegex.exec(blogDataContent)) !== null) {
    blogSlugs.push(slugMatch[1]);
  }

  console.log(`Found ${blogSlugs.length} blog posts in blogData.tsx.`);

  // 3. Resolve all routes dynamically
  const allRoutes = [];

  // Map known routes to specific priority and changefreq
  const routeMetadata = {
    '/': { changefreq: 'daily', priority: '1.0' },
    '/portfolio': { changefreq: 'weekly', priority: '0.9' },
    '/corporate': { changefreq: 'weekly', priority: '0.8' },
    '/weddings': { changefreq: 'weekly', priority: '0.8' },
    '/design': { changefreq: 'monthly', priority: '0.7' },
    '/about': { changefreq: 'monthly', priority: '0.6' },
    '/partners': { changefreq: 'monthly', priority: '0.6' },
    '/blog': { changefreq: 'daily', priority: '0.8' },
    '/contact': { changefreq: 'monthly', priority: '0.5' },
  };

  foundPaths.forEach((routePath) => {
    // Skip if it contains route parameters unless it is '/blog/:slug'
    if (routePath.includes(':')) {
      if (routePath === '/blog/:slug') {
        // Expand the blog slugs
        blogSlugs.forEach((slug) => {
          allRoutes.push({
            path: `blog/${slug}`,
            changefreq: 'weekly',
            priority: '0.7'
          });
        });
      }
      return;
    }

    // Process static route
    const cleanPath = routePath === '/' ? '' : routePath.replace(/^\//, '');
    
    // Check if we have specific metadata for this route
    if (routeMetadata[routePath]) {
      allRoutes.push({
        path: cleanPath,
        ...routeMetadata[routePath]
      });
    } else {
      // Default metadata for any new pages that the user adds
      console.log(`Discovered new static route: ${routePath}. Assigning default metadata.`);
      allRoutes.push({
        path: cleanPath,
        changefreq: 'weekly',
        priority: '0.7'
      });
    }
  });

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
