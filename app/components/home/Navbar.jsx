
// "use client";
// import { useState, useEffect, useRef } from "react";

// export default function Navbar({ onSearchResults }) {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const timeoutRef = useRef(null);

//   // Fetch suggestions as user types
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     // Debounce to avoid too many requests
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(async () => {
//       try {
//         const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
//         const data = await res.json();
//         const articles = data.articles || [];
//         setSuggestions(articles.slice(0, 5)); // show top 5 suggestions
//         setShowDropdown(true);
//       } catch (err) {
//         console.error("Error fetching suggestions:", err);
//       }
//     }, 500);

//     return () => clearTimeout(timeoutRef.current);
//   }, [query]);

//   async function handleSearch(e) {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     try {
//       const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
//       const data = await res.json();
//       onSearchResults(data.articles || []);
//     } catch (err) {
//       console.error("Search failed:", err);
//       onSearchResults([]);
//     } finally {
//       setLoading(false);
//       setShowDropdown(false);
//     }
//   }

//   function handleSuggestionClick(article) {
//     setQuery(article.title);
//     onSearchResults([article]); // Show that specific article
//     setShowDropdown(false);
//   }

//   return (
//     <header className="flex justify-between items-center py-4 px-4 sm:px-12 bg-white shadow-sm sticky top-0 z-50">
//       <h1 className="text-xl font-semibold text-gray-800">Tech Insights</h1>

//       <div className="relative w-48 sm:w-64">
//         <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search articles..."
//             className="text-gray-700 w-full border border-gray-300 rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//           >
//             🔍
//           </button>
//         </form>

//         {/* Dropdown suggestions */}
//         {showDropdown && suggestions.length > 0 && (
//           <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
//             {suggestions.map((article, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleSuggestionClick(article)}
//                 className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
//               >
//                 {article.title}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {loading && <p className="text-sm text-gray-500 ml-4">Searching...</p>}
//     </header>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FolderOpen,
  Cpu,
  Info,
  Mail,
} from "lucide-react";

export default function Navbar({ onSearchResults }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger toggle
  const timeoutRef = useRef(null);

  // Fetch suggestions as user types
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        const articles = data.articles || [];
        setSuggestions(articles.slice(0, 5)); // top 5 suggestions
        setShowDropdown(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      onSearchResults(data.articles || []);
    } catch (err) {
      console.error("Search failed:", err);
      onSearchResults([]);
    } finally {
      setLoading(false);
      setShowDropdown(false);
    }
  }

  function handleSuggestionClick(article) {
    setQuery(article.title);
    onSearchResults([article]);
    setShowDropdown(false);
  }

  const categories = [
    { label: "Home", icon: <Home className="w-5 h-5" />, action: () => router.push("/") },
    { label: "Categories", icon: <FolderOpen className="w-5 h-5" />, action: () => router.push("/category") },
    { label: "Techblogs", icon: <Cpu className="w-5 h-5" />, action: () => router.push("/techblog") },
    { label: "About", icon: <Info className="w-5 h-5" />, action: () => alert("About page") },
    { label: "Contact", icon: <Mail className="w-5 h-5" />, action: () => alert("Contact page") },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center py-4 px-4 sm:px-12">
        <h1 className="text-xl font-semibold text-gray-800">Tech Insights</h1>

        {/* Search Bar */}
        <div className="relative w-48 sm:w-64">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="text-gray-700 w-full border border-gray-300 rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              🔍
            </button>
          </form>

          {/* Dropdown suggestions */}
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
              {suggestions.map((article, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(article)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
                >
                  {article.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading && <p className="text-sm text-gray-500 ml-4">Searching...</p>}

        {/* Hamburger Menu */}
        <button
          className="ml-4 text-gray-700 sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖️" : "☰"}
        </button>

        {/* Desktop Categories */}
        <div className="hidden sm:flex ml-6 space-x-4">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={cat.action}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-sm"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md flex flex-col">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => {
                cat.action();
                setMenuOpen(false); // close menu after click
              }}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-100 space-x-2"
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
