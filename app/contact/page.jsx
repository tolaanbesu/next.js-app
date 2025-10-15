"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("/api/contact",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    });
    
    if(res.ok){ 
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
    }else{
        alert("❌ Failed to send message.")
    }
  };

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
          Contact Us
        </h1>
      </header>

      {/* Contact Form */}
      <section className="w-full flex justify-center py-10 px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-md border p-6 sm:p-8 flex flex-col gap-5 text-gray-700"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
