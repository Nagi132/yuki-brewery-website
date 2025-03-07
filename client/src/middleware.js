// client/src/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
    // During development, just allow all requests to pass through
    return NextResponse.next();
    
    /* 
    // The original code is commented out for now
    // You can uncomment this when you're ready to deploy
    
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
    <!-- Your coming soon HTML -->
    </html>
    `

    return new NextResponse(html, {
        status: 503,
        headers: {
            'Retry-After': '3600',
            'Content-Type': 'text/html',
        },
    })
    */
}

export const config = {
    matcher: ['/:path*', '/images/:path*']
}