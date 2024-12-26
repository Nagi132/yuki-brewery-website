// client/src/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
    // Allow access to static files
    if (request.nextUrl.pathname.startsWith('/images/')) {
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
          }
          
          .video-background {
            position: fixed;
            right: 0;
            bottom: 0;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            z-index: -1;
            transform: scale(1.5);
            object-fit: cover;
          }
          
          .content-overlay {
            position: relative;
            height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1;
            gap: 0.5rem; /* Increased spacing between logo and text */
          }
          
          .logo {
            width: clamp(350px, 20vw, 180px);
            height: auto;
          }
          
          h1 {
            font-size: clamp(16px, 2vw, 20px);
            color: white;
            margin: 0;
            text-align: center;
            letter-spacing: 0.5em; /* Added significant letter spacing */
            font-weight: 300;
            text-transform: uppercase;
            font-family: serif; /* Changed to serif font */
            padding-left:0.7em;
          }
                      .social-links {
            margin-top: 2rem;
          }
          
          .social-links a {
            color: white;
            opacity: 0.8;
            transition: opacity 0.2s ease;
          }
          
          .social-links a:hover {
            opacity: 1;
          }
          
          .social-links svg {
            width: 24px;
            height: 24px;
          }
        </style>
    </head>
   <body>
        <video autoplay muted loop playsinline class="video-background">
            <source src="/images/beer.mp4" type="video/mp4">
        </video>
        
        <div class="content-overlay">
            <img src="/images/saltfields_logo_wh.png" alt="Saltfields Brewing" class="logo">
            <h1>COMING SOON</h1>
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