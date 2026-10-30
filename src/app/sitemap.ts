import type { MetadataRoute } from "next";
import { services, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/practice",
    "/services",
    "/contact",
    ...services.map((service) => `/services/${service.slug}`),
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
