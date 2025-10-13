"use client";
import { useEffect, useState } from "react";
import ArticleActions from "../components/ArticlesActions/actions"

export default function TechBlog() {
  const [articles, setArticles] = useState([]);
  const [videoIds, setVideoIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadArticle() {
    try {
      
      const categories = ["technology", "science"];

      
      const allArticles = await Promise.all(
        categories.map(async (category) => {
          const res = await fetch(`/api/news?category=${category}`);
          const data = await res.json();
          return data.articles || [];
        })
      );

      // Flatten the results into a single array
      const combinedArticles = allArticles.flat();

      if (Array.isArray(combinedArticles) && combinedArticles.length > 0) {
        setArticles(combinedArticles);

         await Promise.all(
          combinedArticles.map(async (article) => {
            if (!article.url) return; // Use article.url as unique ID
            try {
              await fetch("/api/articles/batch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: combinedArticles.map(a => a.url).filter(Boolean) }),
              });
            } catch (err) {
              console.warn("Failed to store article:", err);
            }
          })
        )

        // Fetch related YouTube videos for all articles
        const videoPromises = combinedArticles.map(async (art) => {
          if (!art.title) return null;
          const youtubeRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
              art.title + " technology news"
            )}&type=video&maxResults=1&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
          );
          const youtubeData = await youtubeRes.json();
          return youtubeData.items?.[0]?.id?.videoId || null;
        });

        const videoResults = await Promise.all(videoPromises);
        setVideoIds(videoResults);
      } else {
        console.warn("No articles found in API response");
      }
    } catch (error) {
      console.error("Failed to load tech/science articles:", error);
    } finally {
      setLoading(false);
    }
  }

  loadArticle();
}, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading Tech Blog...
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        No technology articles found.
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 flex justify-center">
      <div className="w-full max-w-8xl bg-white rounded-2xl shadow-md overflow-hidden my-8 mx-4 sm:mx-8 lg:mx-16">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-100">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Back
          </button>
          <h1 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Tech Blog
          </h1>
        </header>

        {/* Article Section */}
        <section className="p-6 sm:p-10">
           {articles.map((article, index) => (
             <div key={index} className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 leading-tight">
                {article.title}
                </h2>
            <p className="text-sm text-gray-500 mb-6">
                By {article.author || "Unknown Author"} ·{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
            </p>

            {article.urlToImage && (
                <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-72 object-cover rounded-xl mb-8"
                />
            )}

            <p className="text-gray-700 leading-relaxed text-base mb-8">
                {article.content || article.description || "No detailed content available."}
            </p>

            {videoIds[index] && (
            <div className="w-full mb-10">
                <iframe
                className="w-full h-72 sm:h-96 rounded-lg"
                src={`https://www.youtube.com/embed/${videoIds[index]}`}
                title="Related tech video"
                allowFullScreen
                ></iframe>
            </div>
            )}

            {/* Footer Actions */}

        
        <footer className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-around text-gray-600 text-sm">
          <ArticleActions articleId={article.url} />
          <button
            onClick={() => window.open(article.url, "_blank")}
            className="hover:text-blue-600 flex items-center gap-x-0.5"
          >
            🔗 Visit Source
          </button>
        </footer>
    </div>
        ))}

        </section>

      </div>
    </main>
  );
}
