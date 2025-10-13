"use client";

import  {useState}  from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddPost() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [authorEmail, setEmail] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "content") setContent(value);
    if (name === "author") setAuthor(value);
    if (name === "email") setEmail(value);
  }
    
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author, authorEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Post created successfully!")
        setTitle("");
        setContent("");
        setAuthor("");
        setEmail("");
      } else {
        toast.error(`❌ Error: ${data.error || "Failed to create post"}`);
      }
    } catch (err) {
      console.error("Request failed", err);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
       <Toaster position="top-left" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title:</label>
          <input
            name="title"
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={handleChange}
            className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Content:</label>
          <textarea
            name="content"
            value={content}
            placeholder="Enter content"
            onChange={handleChange}
            className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Author Name:</label>
          <input
            name="author"
            type="text"
            value={author}
            placeholder="Enter author Name"
            onChange={handleChange}
            className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Author Email:</label>
          <input
            name="email"
            type="email"
            value={authorEmail}
            placeholder="Enter author email"
            onChange={handleChange}
            className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>

      </form>
    </div>
  );
}
