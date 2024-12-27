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
            transform: scale(1.4);
            object-fit: cover;
                        /* Add these properties to maintain aspect ratio */
            aspect-ratio: 16/9; /* or whatever your video's native ratio is */
            object-position: center; /* Keeps video centered */
          }
                    /* Add a media query for mobile */
          @media (max-aspect-ratio: 16/9) {
            .video-background {
              width: 100%;
              height: 100vh;
              object-position: 50% 50%; /* Centers the video */
              object-fit: cover;
            }
          }
         .content-overlay {
            position: relative;
            height: 100vh; /* Changed from 90vh to full height */
            width: 100%;
            display: flex;
            flex-direction: column;
            z-index: 1;
          }
          
          .logo-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .logo {
            width: clamp(220px, 20vw, 180px);
            height: auto;
          }

          .coming-soon-container {
            position: fixed; /* Changed to fixed positioning */
            bottom: 50px;    /* Specific distance from bottom */
            right: 50px;     /* Specific distance from right */
          }

          h1 {
            font-size: clamp(16px, 2vw, 20px);
            color: black;    /* Changed to black */
            margin: 0;
            text-align: right;
            letter-spacing: 0.1em;
            font-weight: 300;
            font-family: serif;
            padding: 0.3em 0.6em;
            background: none; 
            display: inline-block;
          }
          
          /* Adjust for mobile */
          @media (max-width: 768px) {
            .coming-soon-container {
              bottom: 150px;  /* Adjusted for mobile */
              right: 30px;   /* Adjusted for mobile */
            }
          }
        </style>
    </head>
    <body>
        <video autoplay muted loop playsinline class="video-background">
            <source src="/images/beer.mp4" type="video/mp4">
        </video>
        
        <div class="content-overlay">
            <div class="logo-container">
              <img src="/images/saltfields_logo_wh.png" alt="Saltfields Brewing" class="logo">
            </div>
            <div class="coming-soon-container">
              <h1>Coming soon...</h1>
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