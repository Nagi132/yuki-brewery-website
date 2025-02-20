// client/src/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
    // Allow access to static files
    if (
      request.nextUrl.pathname.startsWith('/images/') ||
      request.nextUrl.pathname.includes('google') // This allows the verification file
  ) {
      return NextResponse.next()
  }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Coming Soon</title>
        <meta name="robots" content="noindex, nofollow">
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
                   <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: #000000; /* Japanese ink black */
          }
          
          .content-overlay {
            position: relative;
            height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            z-index: 1;
          }
          
          .coming-soon-container {
            position: fixed;
            bottom: 50px;
            right: 50px;
          }

          h1 {
            font-size: clamp(16px, 2vw, 20px);
            color: white;    /* Changed to white */
            margin: 0;
            text-align: right;
            letter-spacing: 0.2em;
            font-weight: 300;
            font-family: serif;
            padding: 0.3em 0.6em;
            display: inline-block;
          }
  .logo-container {
            flex: 1;
            display: flex;
            flex-direction: column; /* Changed to column to stack logo and icon */
            align-items: center;
            justify-content: center;
            gap: 2rem; /* Space between logo and icon */
          }
          
          .logo {
            width: clamp(150px, 20vw, 180px);
            height: auto;
          }

          .social-links {
            /* Removed fixed positioning */
            color: white;
          }
          
          .social-links a {
            color: white;
            opacity: 0.8;
            transition: opacity 0.2s ease;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .social-links a:hover {
            opacity: 1;
          }
          
          .social-links svg {
            width: 20px;
            height: 20px;
          }

          /* Adjust for mobile */
          @media (max-width: 768px) {
            .coming-soon-container {
              bottom: 30px;
              right: 30px;
            }
            .social-links {
              bottom: 30px;
            }
          }
        </style>
    </head>
    <body>
        <div class="content-overlay">
            <div class="logo-container">
              <img src="/images/saltfields_logo_wh.png" alt="Saltfields Brewing" class="logo">
              <div class="social-links">
                  <a href="https://instagram.com/saltfieldsbrewing" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                  </a>
              </div>
            </div>
            <div class="coming-soon-container">
              <h1>Coming soon.....</h1>
            </div>
        </div>
    </body>
    </html>
  `

    return new NextResponse(html, {
        status: 503,
        headers: {
            'Retry-After': '3600',
            'Content-Type': 'text/html',
        },
    })
}

export const config = {
    matcher: ['/:path*', '/images/:path*']
}