import { NextResponse } from 'next/server'

export function middleware() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Coming Soon</title>
        <meta name="robots" content="noindex, nofollow">
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-black min-h-screen flex items-center justify-center p-4">
        <div class="max mx-auto text-center">
            <h1 class="text-6xl md:text-8xl font-bold text-white tracking-tight">
                COMING SOON🍺
            </h1>

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
  matcher: '/:path*',
}