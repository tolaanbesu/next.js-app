export default function Post({id, title, content, author,}){
    return(
        <div key={id} className="border p-4 rounded-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{content}</p>
            <p className="text-sm text-gray-500">By {author.name} ({author.email})</p>
        </div>
    )
}