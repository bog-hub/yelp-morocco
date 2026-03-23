import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Search from '@/components/Search';

export default async function DirectoryPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || "";

  const businesses = await prisma.business.findMany({
    where: {
      isApproved: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: { _count: { select: { reviews: true } } }
  });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Local Businesses</h1>
      <Search />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {businesses.map((b) => (
          <Link href={`/businesses/${b.slug}`} key={b.id} className="block p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-bold">{b.name}</h2>
            <p className="text-gray-500">{b.category} • {b.city}</p>
            <div className="mt-4 text-sm text-blue-600 font-medium">
              {b._count.reviews} Reviews →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}