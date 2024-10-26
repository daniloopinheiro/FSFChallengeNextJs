import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">Lista de Posts</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-4 border-b border-gray-300 text-left">ID</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Título</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Conteúdo</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {posts.map(post => (
              <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                <td className="py-4 px-4 border-b border-gray-300">{post.id}</td>
                <td className="py-4 px-4 border-b border-gray-300">
                  <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
                    {post.title}
                  </Link>
                </td>
                <td className="py-4 px-4 border-b border-gray-300">{post.body}</td>
              </tr>
            ))}
            {/* Adicionando linhas de exemplo para simulação */}
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index + 100} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                <td className="py-4 px-4 border-b border-gray-300">{index + 101}</td>
                <td className="py-4 px-4 border-b border-gray-300">Título de Exemplo {index + 101}</td>
                <td className="py-4 px-4 border-b border-gray-300">Conteúdo de exemplo para o post {index + 101}.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
