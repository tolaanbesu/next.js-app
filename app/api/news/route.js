

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("q");

//   const endpoint = query
//     ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
//     : `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

//   try {
//     const response = await fetch(endpoint);
//     const data = await response.json();
//     return Response.json(data);
//   } catch (error) {
//     console.error("API Error:", error);
//     return Response.json({ error: "Failed to fetch news" }, { status: 500 });
//   }
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category"); // <-- new category param

  // Build the endpoint based on query or category
  let endpoint = "";

  if (query) {
    endpoint = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  } else if (category) {
    endpoint = `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(
      category.toLowerCase()
    )}&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  } else {
    // default to technology if nothing is provided
    endpoint = `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  }

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
