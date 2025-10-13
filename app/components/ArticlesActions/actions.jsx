"use client";
import { useState } from "react";

export default function ArticleActions({ articleId }) {
  const [likes, setLikes] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setliked] = useState(false);

  

  // Handle Like
  const handleLike = async () => {
    
    try {
      const newlikedstate = !liked;
      setliked(newlikedstate);

      setLikes((prev) => newlikedstate ? prev + 1 : prev - 1); 

      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleid : articleId, liked: newlikedstate }),
      });
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setliked((prev)=> !prev)
      setLikes((prev) =>prev - 1); 
    }
  };

  // Toggle comment box visibility
  const toggleCommentBox = () => setShowCommentBox((prev) => !prev);

  // Add a comment
  const handleAddComment = async (commentText) => {
    if (!commentText) return;
    try {
      setComments((prev) => [...prev, commentText]); 
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({articleId, text:commentText }),
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };
 
  return (
    <div>
      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-around text-gray-600 text-sm">
        <button
          className="hover:text-blue-600 flex items-center gap-x-0.5"
          onClick={handleLike}
        >
          👍 {liked ? "liked" : "Like"} {likes}
        </button>

        <button
          className="hover:text-blue-600 flex items-center gap-x-0.5 ml-2"
          onClick={toggleCommentBox}
        >
          💬 Comment
        </button>
      </footer>

      {showCommentBox && (
        <div className="mt-4 flex flex-col gap-2">
          <textarea
            className="border rounded p-2 w-full"
            rows={3}
            placeholder="Write a comment..."
            id={`comment-${articleId}`}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              const text = document.getElementById(`comment-${articleId}`).value;
              handleAddComment(text);
              document.getElementById(`comment-${articleId}`).value = "";
            }}
          >
            Add Comment
          </button>
        </div>
      )}

      {comments.length > 0 && (
        <div className="mt-2 space-y-2">
          {comments.map((cmt, i) => (
            <p key={i} className="text-gray-700 text-sm">
              {cmt}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
