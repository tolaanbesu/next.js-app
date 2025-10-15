"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex items-center justify-center relative py-4 border-b">
        <button
          onClick={() => window.history.back()}
          className="absolute left-4 text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
        >
          ←
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          About
        </h1>
      </header>

      {/* Content */}
      <section className="w-full flex justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border p-6 sm:p-10 flex flex-col items-center text-center">
          {/* Profile image */}
          <img
            src="/profile.png"
            alt="Founder"
            className="w-28 h-28 rounded-full mb-4 object-cover"
          />

          {/* Name and role */}
          <h2 className="text-xl font-semibold text-gray-800">Sophia Carter</h2>
          <p className="text-gray-500 mb-6 text-sm">Founder & Editor</p>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
            Sophia Carter is a passionate writer and the founder of this blog. With a background
            in journalism and a love for storytelling, she created this platform to share her
            insights and experiences with a wider audience. Her goal is to inspire and inform
            readers through engaging and thought-provoking content.
          </p>

          {/* Mission section */}
          <div className="w-full text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Our mission is to provide high-quality, informative, and engaging content that
              resonates with our readers. We strive to cover a wide range of topics, from lifestyle
              and travel to technology and personal development, always with the aim of adding
              value to our audience’s lives. We believe in the power of words to connect, inspire,
              and drive positive change.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
