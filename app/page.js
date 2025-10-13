
import Post from "./components/post";


export default async function Home() {

  async function  getPosts(){

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}`: "http://localhost:3000";

   const res = await fetch(`${baseUrl}/api/posts`)
   const posts = await res.json();
  
   
    return posts;
  }
  const posts = await getPosts();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-blue-500 text-4xl mb-2">Feed</h1>
        {posts.map((post) =>{
          return (
            <Post 
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
          />)} 
        )}
      </main>
    </div>
  );
}
