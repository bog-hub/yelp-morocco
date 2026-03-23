import { auth } from '@/auth';
import Link from 'next/link';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <nav className="border-b bg-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-black text-red-600">YELP MA</Link>
            <div className="flex gap-6 items-center">
              <Link href="/businesses" className="font-medium">Browse</Link>
              <Link href="/add-business" className="font-medium text-gray-600">+ Add Business</Link>
              {session ? (
                <img src={session.user?.image || ""} className="w-8 h-8 rounded-full border" />
              ) : (
                <Link href="/api/auth/signin" className="text-sm font-bold bg-gray-100 px-4 py-2 rounded-lg">Login</Link>
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}