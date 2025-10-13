export default function ArticleList({ articles }) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Latest Tech News</h3>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex-1 pr-3">
              <p className="text-sm text-blue-600">{article.source?.name}</p>
              <h4 className="font-semibold text-gray-800">{article.title}</h4>
              <p className="text-gray-600 text-sm">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                className="text-blue-600 text-sm mt-1 inline-block"
              >
                Read full article →
              </a>
            </div>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-20 h-20 rounded-lg object-cover hidden sm:block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
