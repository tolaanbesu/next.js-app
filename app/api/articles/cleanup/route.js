import prisma from "../../../../lib/prisma";

export async function POST(req) {
  try {
    // Calculate 24 hours ago
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Delete all articles older than 1 day
    const deleted = await prisma.article.deleteMany({
      where: { createdAt: { lt: oneDayAgo } },
    });

    return new Response(
      JSON.stringify({ success: true, deletedCount: deleted.count }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to clean up articles:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
