// app/layout.tsx
import { ReactNode } from 'react'
import "@/styles/globals.css";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
