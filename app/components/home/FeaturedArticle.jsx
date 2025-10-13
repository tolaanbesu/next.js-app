"use client";
import { useEffect, useState } from "react";

export default function FeaturedArticle() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchArticle() {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();

      // Handle both shapes — array or { articles: [...] }
      const articles = Array.isArray(data) ? data : data.articles;

      if (Array.isArray(articles) && articles.length > 0) {
        setArticle(articles[0]); // you can also randomize here
      } else {
        console.warn("No articles found in response");
      }
    } catch (error) {
      console.error("Failed to load featured article:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchArticle();
}, []);


  if (loading) {
    return (
      <section className="rounded-2xl overflow-hidden min-h-[480px] flex items-center justify-center bg-gray-200 text-gray-600">
        Loading featured article...
      </section>
    );
  }

  if (!article) {
    return (
      <section className="rounded-2xl overflow-hidden min-h-[480px] flex items-center justify-center bg-gray-200 text-gray-600">
        No featured article found.
      </section>
    );
  }

  return (
    <section
      className="relative rounded-2xl overflow-hidden min-h-[480px] flex flex-col justify-end p-6 sm:p-10 bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url('${article.urlToImage || "https://via.placeholder.com/1200x600?text=No+Image"}')`,
      }}
    >
      <div className="max-w-2xl space-y-3">
        <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
          {article.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-200">
          {article.description || "No description available."}
        </p>
        <button
          onClick={() => window.open(article.url, "_blank")}
          className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition"
        >
          Read More
        </button>
      </div>
    </section>
  );
}
