export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  content: string;
  thumbnail: {
    url: string;
  };
}
