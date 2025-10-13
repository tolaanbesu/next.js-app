
import prisma from "../../../lib/prisma"; 

export async function GET(){
  const posts = await prisma.post.findMany({
    where: {published: true},
    include: {author: true}
  });

  return Response.json(posts);
}

export async function POST(request){

  const { title, content, author, authorEmail } = await request.json();

  let user = await prisma.user.findUnique({
    where: {email: authorEmail}
  });
  if (!user){
    user = await prisma.user.create({
      data: {
        name:author, email:authorEmail
      }
    })
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author:{
        connect: {email: authorEmail}
      }
    }
  });

 return Response.json(newPost, {status: 201});
}




