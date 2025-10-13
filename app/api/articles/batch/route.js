// import prisma from "../../../../lib/prisma";

// export async function POST(req) {
//   const { ids } = await req.json();
//   if (!Array.isArray(ids)) return new Response("Invalid data", { status: 400 });

//   await Promise.all(
//     ids.map(id =>
//       prisma.article.upsert({
//         where: { id },
//         update: {},
//         create: { id },
//       })
//     )
//   );

//   return new Response(JSON.stringify({ success: true }), { status: 200 });
// }

// import prisma from "../../../../lib/prisma";

// export async function POST(req) {
//   const { ids } = await req.json();
//   if (!Array.isArray(ids)) return new Response("Invalid data", { status: 400 });

//   // Step 1: find all existing ids
//   const existing = await prisma.article.findMany({
//     where: { id: { in: ids } },
//     select: { id: true },
//   });

//   const existingIds = existing.map(a => a.id);
//   const newIds = ids.filter(id => !existingIds.includes(id));

//   // Step 2: insert only missing ones
//   if (newIds.length > 0) {
//     await prisma.article.createMany({
//       data: newIds.map(id => ({ id })),
//       skipDuplicates: true, // just in case
//     });
//   }

//   return new Response(JSON.stringify({ success: true }), { status: 200 });
// }

// pages/api/articles/check-and-add.ts
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { ids } = await req.json();

  if (!Array.isArray(ids)) return new Response("Invalid data", { status: 400 });

  try {
    const count = await prisma.article.count();
    if (count === 0) {
      await prisma.article.createMany({
        data: ids.filter(Boolean).map((id) => ({ id })),
        skipDuplicates: true,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
