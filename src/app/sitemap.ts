import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/content/posts";
import { getAllGardenNotes } from "@/content/garden";
import { getAllLogEntries } from "@/content/log";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const gardenNotes = getAllGardenNotes();
  const logEntries = getAllLogEntries();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/thoughts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/garden`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/log`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/now`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${SITE.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const gardenRoutes: MetadataRoute.Sitemap = gardenNotes.map((note) => ({
    url: `${SITE.url}/garden/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const logRoutes: MetadataRoute.Sitemap = logEntries.map((entry) => ({
    url: `${SITE.url}/log/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...postRoutes,
    ...gardenRoutes,
    ...logRoutes,
  ];
}
