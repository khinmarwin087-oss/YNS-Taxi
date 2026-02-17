import { RideProvider } from '@/context/RideContext';
import './globals.css'; // CSS ဖိုင်ရှိဖို့လိုပါမယ်

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="my">
      <body>
        <RideProvider>
          {children}
        </RideProvider>
      </body>
    </html>
  );
}

