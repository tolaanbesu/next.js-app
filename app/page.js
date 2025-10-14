
"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/home/Navbar";
import FeaturedArticle from "./components/home/FeaturedArticle";
import ArticleList from "./components/home/ArticleList";
import Footer from "./components/home/Footer"

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getNews() {
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Failed to load news:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  function handleSearchResults(results) {
    setArticles(results);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onSearchResults={handleSearchResults} />
      <main className="flex-1 px-4 sm:px-12 py-6">
        <FeaturedArticle />
        {loading ? (
          <p className="text-gray-500">Loading articles...</p>
        ) : (
          <ArticleList articles={articles} />
        )}
      </main>
      <Footer />
      
    </div>
  );
}
