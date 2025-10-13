// "use client";
// import { useEffect, useState } from "react";
// import BottomNav from "../components/home/BottomNav";

// const category = [General, Business, Entertainment, Health, Science, Sports, Technology]

// export default function CategoryPage() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const category = "Technology"; // You can make this dynamic later

//   useEffect(() => {
//     async function fetchArticles() {
//       try {
//         const res = await fetch("/api/news");
//         const data = await res.json();

//         const articles = data.articles || [];
//         const filtered = articles.filter(
//         (article) =>
//             article.category?.toLowerCase() === category.toLowerCase() ||
//             article.title?.toLowerCase().includes(category.toLowerCase())
//         );
//         setArticles(filtered.slice(0, 6));

        
//       } catch (err) {
//         console.error("Failed to load articles:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchArticles();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 sm:p-6 border-b bg-white shadow-sm sticky top-0 z-50">
//         <button
//           onClick={() => window.history.back()}
//           className="text-gray-700 text-2xl font-medium hover:text-blue-600"
//         >
//           ←
//         </button>
//         <h1 className="text-lg sm:text-xl font-semibold text-gray-800">{category}</h1>
//         <div className="w-6"></div> {/* Spacer for centering */}
//       </header>

//       {/* Content */}
//       <main className="flex-1 p-4 sm:p-8">
//         {loading ? (
//           <p className="text-gray-500 text-center mt-12">Loading articles...</p>
//         ) : articles.length > 0 ? (
//           <div className="space-y-5">
//             {articles.map((article, i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition"
//               >
//                 <div className="flex-1">
//                   <p className="text-blue-600 text-xs sm:text-sm font-medium mb-1">
//                     {article.category || "Technology"}
//                   </p>
//                   <h2 className="text-gray-900 text-base sm:text-lg font-semibold mb-1">
//                     {article.title}
//                   </h2>
//                   <p className="text-gray-600 text-sm">
//                     {article.description?.slice(0, 100) ||
//                       "Explore this topic to learn more about the latest advancements in tech."}
//                   </p>
//                 </div>
//                 {article.urlToImage && (
//                   <img
//                     src={article.urlToImage}
//                     alt={article.title}
//                     className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover ml-4"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center mt-12">No articles found for this category.</p>
//         )}
//       </main>

//       <BottomNav />
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import BottomNav from "../components/home/BottomNav";

const categories = ["General", "Business", "Entertainment", "Health", "Science", "Sports", "Technology"];

export default function CategoryPage() {
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const newArticlesByCategory = {};
      try {
        // Fetch articles for each category
        for (const category of categories) {
          const res = await fetch(`/api/news?category=${category.toLowerCase()}`);
          const data = await res.json();
          newArticlesByCategory[category] = (data.articles || []).slice(0, 6);
        }
        setArticlesByCategory(newArticlesByCategory);
      } catch (err) {
        console.error("Failed to load articles:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 border-b bg-white shadow-sm sticky top-0 z-50">
        <button
         onClick={() => window.history.back()}
         className="text-gray-700 text-2xl font-medium hover:text-blue-600">
         ←
         </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">News by Category</h1>
      </header>
      
      
      {/* Content */}
      <main className="flex-1 p-4 sm:p-8 space-y-10">
        {loading ? (
          <p className="text-gray-500 text-center mt-12">Loading articles...</p>
        ) : (
          categories.map((category) => (
            <section key={category}>
              <h2 className="text-xl font-semibold text-black mb-4">{category}</h2>
              <div className="space-y-5">
                {articlesByCategory[category]?.length > 0 ? (
                  articlesByCategory[category].map((article, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-blue-600">{article.source?.name}</p>
                        <h3 className="text-gray-900 text-base sm:text-lg font-semibold mb-1">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {article.description?.slice(0, 100) || "Explore this topic to learn more."}
                        </p>
                        <a
                            href={article.url}
                            target="_blank"
                            className="text-blue-600 text-sm mt-1 inline-block">
                            Read full article →
                        </a>
                      </div>
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover ml-4"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No articles found for this category.</p>
                )}
              </div>
            </section>
          ))
        )}
      </main>

      
    </div>
  );
}

