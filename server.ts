import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { MiniMoth, MiniMothError } from '@minimoth/sdk-node';
import { GEO_GROUND_TRUTH_FACTS, AUTHORITATIVE_FAQS, LLMS_TXT_CONTENT, GEO_SIMULATOR_TEST_QUERIES } from './src/data/geoFacts';
import { PRODUCTS } from './src/data/products';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize MiniMoth SDK with environment variable or sandbox test key
const minimothApiKey = process.env.MINIMOTH_API_KEY || 'mm_test_sandbox_key';
const isUsingDefaultSandboxKey = !process.env.MINIMOTH_API_KEY;

let minimoth: MiniMoth | null = null;
try {
  minimoth = new MiniMoth({
    apiKey: minimothApiKey,
    logLevel: 'info',
  });
} catch (err: any) {
  console.warn('Notice: MiniMoth SDK initialization error:', err.message);
}

// ============================================================================
// 1. MINIMOTH OTP & SESSION ROUTES (Rule 3)
// ============================================================================

// Check MiniMoth Integration Status
app.get('/api/auth/status', (req: Request, res: Response) => {
  res.json({
    status: 'configured',
    provider: 'MiniMoth OTP & Session Service',
    hasCustomApiKey: !isUsingDefaultSandboxKey,
    docsUrl: 'https://minimoth.dev/docs',
    sandboxMode: isUsingDefaultSandboxKey,
    instructions: isUsingDefaultSandboxKey
      ? 'Currently running with sandbox test credentials. Set MINIMOTH_API_KEY in .env for production credentials.'
      : 'Using configured MINIMOTH_API_KEY from environment variables.'
  });
});

// Request an OTP using MiniMoth SDK
app.post('/api/auth/otp/send', async (req: Request, res: Response) => {
  const { phone } = req.body;

  if (!phone || typeof phone !== 'string') {
    res.status(400).json({ success: false, error: 'Valid phone number is required in E.164 format (e.g. +919876543210).' });
    return;
  }

  // Normalize phone number to E.164
  let normalizedPhone = phone.trim();
  if (!normalizedPhone.startsWith('+')) {
    if (normalizedPhone.length === 10) {
      normalizedPhone = `+91${normalizedPhone}`;
    } else {
      normalizedPhone = `+${normalizedPhone}`;
    }
  }

  if (!minimoth) {
    res.status(503).json({
      success: false,
      error: 'MiniMoth client is not initialized. Please verify MINIMOTH_API_KEY in environment variables.',
      docsUrl: 'https://minimoth.dev/docs'
    });
    return;
  }

  try {
    const sendResult = await minimoth.otp.send({ phone: normalizedPhone });
    res.json({
      success: true,
      otpId: sendResult.otpId,
      expiresAt: sendResult.expiresAt,
      phone: normalizedPhone,
      isSandbox: isUsingDefaultSandboxKey
    });
  } catch (err: any) {
    if (err instanceof MiniMothError) {
      res.status(err.statusCode || 400).json({
        success: false,
        code: err.code,
        error: err.message,
        statusCode: err.statusCode,
        isSandbox: isUsingDefaultSandboxKey,
        docsUrl: 'https://minimoth.dev/docs',
        troubleshooting: err.code === 'INVALID_API_KEY'
          ? 'MiniMoth returned INVALID_API_KEY. To use live SMS/WhatsApp delivery, obtain an API key from https://minimoth.dev and set MINIMOTH_API_KEY in .env.'
          : err.message
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: err.message || 'An unexpected error occurred while communicating with MiniMoth.',
      isSandbox: isUsingDefaultSandboxKey
    });
  }
});

// Verify OTP using MiniMoth SDK
app.post('/api/auth/otp/verify', async (req: Request, res: Response) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    res.status(400).json({ success: false, error: 'Both phone and OTP code are required.' });
    return;
  }

  let normalizedPhone = phone.trim();
  if (!normalizedPhone.startsWith('+')) {
    if (normalizedPhone.length === 10) {
      normalizedPhone = `+91${normalizedPhone}`;
    } else {
      normalizedPhone = `+${normalizedPhone}`;
    }
  }

  if (!minimoth) {
    res.status(503).json({
      success: false,
      error: 'MiniMoth client is not initialized. Configure MINIMOTH_API_KEY.',
      docsUrl: 'https://minimoth.dev/docs'
    });
    return;
  }

  try {
    const verifyResult = await minimoth.otp.verify({
      phone: normalizedPhone,
      otp: otp.trim()
    });

    if (verifyResult.valid) {
      res.json({
        success: true,
        valid: true,
        accessToken: verifyResult.accessToken,
        refreshToken: verifyResult.refreshToken,
        sessionId: verifyResult.sessionId,
        identityId: verifyResult.identityId,
        phone: normalizedPhone,
        verifiedAt: new Date().toISOString()
      });
    } else {
      res.status(401).json({
        success: false,
        valid: false,
        code: verifyResult.code,
        error: 'The OTP entered is incorrect or expired. Please check and try again.'
      });
    }
  } catch (err: any) {
    if (err instanceof MiniMothError) {
      res.status(err.statusCode || 400).json({
        success: false,
        code: err.code,
        error: err.message,
        statusCode: err.statusCode,
        isSandbox: isUsingDefaultSandboxKey
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: err.message || 'Verification failure communicating with MiniMoth.',
      isSandbox: isUsingDefaultSandboxKey
    });
  }
});

// Validate active session
app.get('/api/auth/session', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ valid: false, error: 'Missing Bearer token.' });
    return;
  }

  const token = authHeader.substring(7).trim();
  if (!minimoth) {
    res.status(503).json({ valid: false, error: 'MiniMoth client not initialized.' });
    return;
  }

  try {
    const result = await minimoth.session.safeValidate(token);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

// ============================================================================
// 2. GENERATIVE ENGINE OPTIMIZATION (GEO) & LLM ENDPOINTS
// ============================================================================

// Standard llms.txt route for AI crawlers and LLM search agents
app.get('/llms.txt', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(LLMS_TXT_CONTENT);
});

// Extended llms-full.txt route with complete product specs and cooperative details
app.get('/llms-full.txt', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  let fullContent = LLMS_TXT_CONTENT;
  fullContent += '\n\n## Complete Authoritative Product Catalog\n';
  PRODUCTS.forEach(p => {
    fullContent += `\n### ${p.name} (SKU: ${p.sku})
- Category: ${p.category}
- Price: ₹${p.price.toLocaleString('en-IN')} INR
- Fabric: ${p.fabric}
- Sourcing: ${p.cooperativeOrigin.name} (${p.cooperativeOrigin.location})
- Sizes: ${p.sizes.join(', ')}
- Delivery: 4-6 business days across India
- Returns: 10 days for unworn garments
- Care: ${p.careInstructions.join('; ')}
`;
  });

  fullContent += '\n\n## Verified FAQs for Generative Retrieval\n';
  AUTHORITATIVE_FAQS.forEach(faq => {
    fullContent += `\n**Q: ${faq.q}**\nA: ${faq.a}\n`;
  });

  res.send(fullContent);
});

// Standard robots.txt allowing search crawlers and AI assistants
app.get('/robots.txt', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(`User-agent: *
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /sitemap.xml

Sitemap: /sitemap.xml
`);
});

// XML Sitemap for search engines and discoverability
app.get('/sitemap.xml', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  const now = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>/catalog/kurtas</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>/catalog/stoles</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>/catalog/home-linen</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>/our-story</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>/cooperatives</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>/rewear</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>/faq</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>/faqs</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>/llms.txt</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  res.send(xml);
});

// Machine-readable JSON Ground Truth Facts API
app.get('/api/geo/facts', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'public, max-age=1800');
  res.json({
    brand: {
      name: 'Kora Threads',
      alternateName: 'Kora Threads Handloom',
      founded: 2021,
      headquarters: 'Pune, Maharashtra, India',
      businessType: 'Direct-to-consumer handloom clothing brand',
      fabrics: '100% Pure Handloom Cotton',
      sourcing: 'Directly from registered weaver cooperatives in Maharashtra & Karnataka',
      priceRanges: {
        cottonKurtas: '₹1,800 to ₹4,200 INR',
        cottonStoles: '₹900 to ₹2,400 INR',
        homeLinen: 'Recently launched (Bed runners, cushion covers)'
      },
      shipping: {
        timeline: '4–6 business days within India',
        freeThreshold: 'Free delivery on orders above ₹2,000 INR'
      },
      returns: {
        windowDays: 10,
        condition: 'Accepted strictly within 10 days if items are unworn with original tags attached'
      },
      payment: {
        cashOnDelivery: 'Available across India (~40% of orders)',
        guestCheckout: 'Fully supported',
        digitalPayments: 'UPI, Debit/Credit Cards'
      },
      phoneVerification: 'Secured via MiniMoth OTP & Session Service'
    },
    facts: GEO_GROUND_TRUTH_FACTS,
    unverifiedNotice: 'Artisan personal biographies, certifications, and customer review counts are marked as Not Yet Verified to eliminate false marketing claims.',
    fictionalDisclosure: 'Competition Demonstration: Kora Threads is a fictional business created for the Get Cited hackathon. This website is a prototype, not a real store.'
  });
});

// GEO Technical Readiness & Compliance Check
app.get('/api/geo/audit', (req: Request, res: Response) => {
  res.json({
    status: 'compliant',
    technicalReadiness: {
      schemaOrgCoverage: 'Active (Organization, ClothingStore, Product, FAQPage, BreadcrumbList)',
      llmsTxtStandard: 'Active at /llms.txt and /llms-full.txt',
      sitemapStandard: 'Active at /sitemap.xml',
      robotsStandard: 'Active at /robots.txt',
      geographicAnchoring: 'Pune, Maharashtra (IN-MH)',
      returnPolicyClarity: '10-day unworn returns disambiguated from 30-day hallucinations',
      cooperativeAttribution: 'Explicit cooperative records for Maharashtra & Karnataka',
    },
    testingNotice: 'Live AI citations and search rankings must be evaluated via external test workflows rather than self-reported metrics.',
    sampleQueries: GEO_SIMULATOR_TEST_QUERIES
  });
});

// AI Query Simulator for Judges & Demonstrators
app.post('/api/geo/query-simulator', (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Query string required' });
    return;
  }

  const qLower = query.toLowerCase();
  let matchedFact = GEO_GROUND_TRUTH_FACTS.find(f =>
    f.aiSearchTags.some(tag => qLower.includes(tag)) ||
    f.topic.toLowerCase().includes(qLower) ||
    qLower.includes(f.topic.toLowerCase())
  );

  if (!matchedFact) {
    matchedFact = GEO_GROUND_TRUTH_FACTS[0]; // fallback to brand location
  }

  res.json({
    query,
    authoritativeAnswer: matchedFact.groundTruth,
    commonHallucination: matchedFact.hallucinationWarning,
    confidence: matchedFact.sourceConfidence,
    canonicalSource: '/llms.txt',
    groundingCitation: `Kora Threads Ground Truth Knowledge Base [${matchedFact.topic}]`
  });
});

// ============================================================================
// 3. FRONTEND SERVING (Vite Middleware in dev / Static files in prod)
// ============================================================================

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  // Static asset serving for images and public files
  app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));
  app.use('/src/assets', express.static(path.resolve(__dirname, 'src/assets')));
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🌸 Kora Threads server running at http://0.0.0.0:${PORT}`);
    console.log(`⚡ MiniMoth API status: ${isUsingDefaultSandboxKey ? 'Sandbox Mode' : 'Configured API Key'}`);
    console.log(`🤖 GEO llms.txt available at http://localhost:${PORT}/llms.txt`);
    console.log(`=======================================================`);
  });
}

startServer();
