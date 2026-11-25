import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/offerings";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/practice",
    "/services",
    "/contact",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
