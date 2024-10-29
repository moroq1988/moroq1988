import { client } from "@/lib/client";
import Link from "next/link";
import { Blog } from "@/types/blog";

export default async function Home() {
  const data = await client.get({
    endpoint: "blogs",
    queries: { limit: 10 },
  });

  const blogs: Blog[] = data.contents;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">記事一覧</h1>
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <article key={blog.id} className="border p-4 rounded-lg">
            <Link href={`/blog/${blog.id}`}>
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <time className="text-gray-500">
                {new Date(blog.publishedAt).toLocaleDateString()}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
