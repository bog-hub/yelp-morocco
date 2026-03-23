import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function AddBusinessPage() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");

  async function createBusiness(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const category = formData.get("category") as string;

    await prisma.business.create({
      data: {
        name,
        city,
        category,
        slug: name.toLowerCase().replace(/ /g, "-") + "-" + Math.random().toString(36).substring(7),
        isApproved: false, // Wait for admin approval
      },
    });
    redirect("/businesses?pending=true");
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add a New Business</h1>
      <form action={createBusiness} className="flex flex-col gap-4">
        <input name="name" placeholder="Business Name" className="p-3 border rounded-lg" required />
        <input name="city" placeholder="City (e.g. Marrakech)" className="p-3 border rounded-lg" required />
        <select name="category" className="p-3 border rounded-lg">
          <option>Cafe</option>
          <option>Restaurant</option>
          <option>Hotel</option>
          <option>Gym</option>
        </select>
        <button type="submit" className="bg-red-600 text-white p-3 rounded-lg font-bold">Submit for Approval</button>
      </form>
    </div>
  );
}