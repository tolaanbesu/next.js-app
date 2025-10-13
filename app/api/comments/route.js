import prisma from "../../../lib/prisma"; 

export async function POST(req) {
  try {
    const { articleId, text } = await req.json();

    if (!articleId || !text) {
      return new Response(JSON.stringify({ error: "Missing data" }), { status: 400 });
    }

    // Ensure article exists
    await prisma.article.upsert({
      where: { id: articleId },
      update: {},
      create: { id: articleId },
    });

    const comment = await prisma.comment.create({
      data: { articleId, text },
    });

    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
