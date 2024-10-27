import { client } from "@/lib/client";
import { Blog } from "@/types/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Paramsの型を定義
type Params = {
  params: {
    id: string;
  };
};

// generateMetadataの型定義
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const blog = await client.get({
      endpoint: "blogs",
      contentId: params.id,
    });

    return {
      title: blog.title,
      description: blog.description || "ブログ記事",
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "ページが見つかりませんでした",
    };
  }
}

// generateStaticParamsの型定義を修正
export async function generateStaticParams() {
  const data = await client.get({
    endpoint: "blogs",
  });

  return data.contents.map((blog: Blog) => ({
    id: blog.id,
  }));
}

// PageComponentの型定義を修正
export default async function BlogDetail({ params }: Params) {
  try {
    const blog = await client.get({
      endpoint: "blogs",
      contentId: params.id,
    });

    return (
      <main className="container mx-auto px-4 py-8">
        <article className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <time className="text-gray-500 block mb-8">
            {new Date(blog.publishedAt).toLocaleDateString()}
          </time>
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="mt-8"
          />
        </article>
      </main>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }
}
