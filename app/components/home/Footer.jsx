export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 sm:px-12 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Tech Insights</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Stay ahead in the world of technology with daily news, expert insights, and trends that shape the future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">AI & Machine Learning</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Software Development</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Gadgets</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Tech Business</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">🐦</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition">💼</a>
            <a href="#" aria-label="GitHub" className="hover:text-blue-400 transition">💻</a>
            <a href="#" aria-label="YouTube" className="hover:text-blue-400 transition">▶️</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tech Insights. All rights reserved.
      </div>
    </footer>
  );
}
