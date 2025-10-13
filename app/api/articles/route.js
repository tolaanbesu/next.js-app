import prisma from "../../../lib/prisma";

// Increment article likes
export async function POST(req) {
  try {
    const { articleid, liked } = await req.json();

    if (!articleid) {
      return new Response(JSON.stringify({ error: "Missing article id" }), { status: 400 });
    }

    const updatedArticle = await prisma.article.upsert({
      where: { id: articleid },
      update: { likes: liked ? { increment: 1 } : {decrement : 1} },
      create: { id: articleid, likes: liked ? 1 : 0 },
    });

    return new Response(JSON.stringify(updatedArticle), { status: 200 });
  } catch (error) {
    console.error("Error updating likes:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

// Get article engagement data (likes + comments)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { id },
      include: { comments: true },
    });

    return new Response(JSON.stringify(article || { id, likes: 0, comments: [] }), { status: 200 });
  } catch (error) {
    console.error("Error fetching article:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
