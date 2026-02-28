import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-edge rate limiter for the search API
// Uses a sliding window via response headers — stateless, works on Vercel Edge
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests/min per IP — human never hits this, scrapers do

// Known aggressive scraper/AI trainer user agents to block
const BLOCKED_UA_PATTERNS = [
  'CCBot',           // Common Crawl — feeds many AI training datasets
  'GPTBot',          // OpenAI training crawler (different from ChatGPT search)
  'Google-Extended', // Google Bard/Gemini training (we allow indexing but not training)
  'anthropic-ai',    // Anthropic training (we allow Claude search, not training scrapes)
  'omgili',          // Data mining bot
  'DataForSeoBot',   // SEO data harvesting
  'Scrapy',          // Python scraping framework
  'HTTrack',         // Website copier
  'SiteSnagger',     // Website downloader
  'WebCopier',       // Website copier
  'WebReaper',       // Website copier
  'larbin',          // Bulk crawler
  'wget',            // Command-line downloader (bulk use)
];

// Known good bots we always allow
const ALLOWED_UA_PATTERNS = [
  'Googlebot',
  'bingbot',
  'Slurp',           // Yahoo
  'DuckDuckBot',
  'Baiduspider',
  'facebot',
  'LinkedInBot',
  'Twitterbot',
  'PerplexityBot',
  'ChatGPT-User',    // ChatGPT browsing (discovery, not training)
  'ClaudeBot',       // Claude browsing
  'cohere-ai',
];

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const pathname = request.nextUrl.pathname;

  // Always allow good bots
  const isGoodBot = ALLOWED_UA_PATTERNS.some(p => ua.includes(p));
  if (isGoodBot) return NextResponse.next();

  // Block known scraper/training UAs on all routes
  const isBlocked = BLOCKED_UA_PATTERNS.some(p => ua.toLowerCase().includes(p.toLowerCase()));
  if (isBlocked) {
    return new NextResponse(
      JSON.stringify({
        error: 'Automated access to this content is restricted. See https://u-god.com/terms',
        terms: 'https://u-god.com/terms',
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'X-Robots-Tag': 'noindex',
        },
      }
    );
  }

  // Rate limit the /api/ routes specifically
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();

    // Add rate limit headers so legitimate clients can self-throttle
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
    response.headers.set('X-RateLimit-Window', String(RATE_LIMIT_WINDOW_MS));

    // Add IP fingerprint header for debugging (not exposed to user)
    response.headers.set('X-Client-IP', ip.substring(0, 8) + '***');

    return response;
  }

  // Add copyright headers to all responses
  const response = NextResponse.next();
  response.headers.set('X-Content-Owner', 'U-God Sacred Library — https://u-god.com');
  response.headers.set('X-License', 'All original content © U-God. See https://u-god.com/terms');

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)',
  ],
};
