// src/app/fonts.js
import localFont from 'next/font/local'

export const ttPolls = localFont({
  src: [
    {
      path: './fonts/tt-polls-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/tt-polls-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
        path: './fonts/tt-polls-thin.otf',
        weight: '100',
        style: 'normal',
      },
      {
        path: './fonts/tt-polls-light.otf',
        weight: '300',
        style: 'normal',
      }
  ],
  variable: '--font-tt-polls',
  display: 'swap',
})