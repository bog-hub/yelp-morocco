import Link from 'next/link';
import { auth } from '@/auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto pt-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Discover the Best of <span className="text-red-600">Morocco</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Find top-rated cafes in Casablanca, Riads in Fes, and gyms in Safi.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/businesses" className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition">
            Explore Directory
          </Link>
          {!session && (
            <Link href="/api/auth/signin" className="bg-white border border-gray-300 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
              Sign In to Review
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}