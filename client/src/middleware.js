import { NextResponse } from 'next/server'

export function middleware() {
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
            display: block;
            padding: 0;
            margin: 0;
            width: 100%;
            position: relative;
            height: 100%;
            overflow: hidden;
            font-family: "Arial", sans-serif;
          }
          section {
            position: relative;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, #FBB600, #DA5900);
          }
          #beerCanvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
          }
          .coming_content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            margin: 0 auto;
            color: white;
            text-align: center;
            z-index: 101;
          }
          .coming_content h1 {
            font-size: clamp(40px, 10vw, 90px);
            margin: 0;
            letter-spacing: 2px;
            text-align: center;
            color: white;
          }
          .separator {
            color: white;
            margin: 0 auto 1em;
            width: 11em;
          }
          .line_separator svg {
            width: clamp(20px, 5vw, 30px);
            height: clamp(15px, 4vw, 20px);
          }
          .line_separator:before, .line_separator:after {
            display: block;
            width: 40%;
            content: " ";
            margin-top: 14px;
            border: 1px solid white;
          }
          .line_separator:before {
            float: left;
          }
          .line_separator:after {
            float: right;
          }
          .coming_content h3 {
            font-family: 'Montserrat', sans-serif;
            letter-spacing: 2px;
            line-height: 2;
            font-size: clamp(14px, 3vw, 16px);
            font-weight: 400;
            text-align: center;
            margin: 0;
          }
        </style>
    </head>
    <body>
        <section>
            <canvas id='beerCanvas'></canvas>
            <div class="coming_content">
                <h1>COMING SOON</h1>
                <div class="separator_container">
                    <div class="separator line_separator">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="320.864" height="320.864" viewBox="0 0 320.864 320.864"><path fill="#fff" d="M184.04 81.83c-1.89-5.1-3.46-28.63-3.926-55.05-.003-.1.107-.37.514-.37 2.092-.125 3.248-1.79 3.248-3.91V4c0-2.2-1.8-4-4-4H140.99c-2.2 0-4 1.8-4 4v18.5c0 2.123 1.06 3.77 3.152 3.89.673 0 .613.478.61.673-.463 26.677-2.035 49.67-3.925 54.77-11.12 29.993-35.884 27.39-35.884 63.393V273.96c0 49.536 24.92 47.044 59.49 46.82 34.57.224 59.49 2.716 59.49-46.82V145.226c0-36.002-24.764-33.4-35.883-63.394zm12.89 127.953c-5.845 8.89-31.005 30.02-36.458 30.02-5.338 0-30.727-21.21-36.532-30.02-2.907-4.41-4.97-9.277-4.627-15.678.605-11.325 9.866-20.678 21.208-20.678 11.66 0 18.45 12.44 19.915 12.44 1.675 0 8.755-12.44 19.914-12.44 11.34 0 20.6 9.353 21.206 20.678.342 6.4-1.713 11.247-4.627 15.678z"/></svg>
                        </span>
                    </div>
                </div>
                <h3>Saltfields Brewing</h3>
            </div>
        </section>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                var canvas = document.getElementById('beerCanvas');
                var ctx = canvas.getContext('2d');
                var particles = [];
                var particleCount = window.innerWidth < 768 ? 100 : 200; // Reduce particles on mobile

                function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
                window.addEventListener('resize', resizeCanvas);
                resizeCanvas();

                for (var i = 0; i < particleCount; i++) {
                    particles.push(new particle());
                }

                function particle() {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height + Math.random() * 300;
                    // Scale speed based on screen height for consistent appearance
                    this.speed = (2 + Math.random() * 3) * (window.innerHeight / 1000);
                    // Scale radius based on screen width
                    this.radius = Math.random() * (window.innerWidth < 768 ? 8 : 12) + 4;
                    this.opacity = (Math.random() * 200) / 1000;
                }

                function loop() {
                    requestAnimationFrame(loop);
                    draw();
                }

                function draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.globalCompositeOperation = 'lighter';
                    for (var i = 0; i < particles.length; i++) {
                        var p = particles[i];
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
                        ctx.fill();
                        p.y -= p.speed;
                        if (p.y <= -10)
                            particles[i] = new particle();
                    }
                }

                loop();
            });
        </script>
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