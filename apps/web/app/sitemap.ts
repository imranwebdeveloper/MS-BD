import { getAllMobiles } from "@/utils/getAllMobiles";
const sitemap = async () => {
  const baseUrl = process.env["FULL_DOMAIN_URL"] as string;
  const data = await getAllMobiles();
  const brandNames = new Set();
  data.forEach((item) => brandNames.add(item.brand));
  const brandNamesArray = Array.from(brandNames);
  const brandRoute = brandNamesArray.map((item: any) => {
    return {
      url: `${baseUrl}/mobile/${item.toLowerCase()}`,
      lastModified: new Date(),
    };
  });

  const modelRoute = data.map((item) => {
    return {
      url: `${baseUrl}/mobile/${item.brand.toLowerCase()}/${item.model_id}`,
      lastModified: new Date(item.updatedAt),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/mobile/latest`,
      lastModified: new Date(),
    },
    ...brandRoute,
    {
      url: `${baseUrl}/category/tablets`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/category/smartphones`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/category/feature-phones`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/price-range/1-5000`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/price-range/5001-10000`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/price-range/10001-20000`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/price-range/20001-30000`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/price-range/30001-50000`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/price-range/50001`,
      lastModified: new Date(),
    },
    ...modelRoute,
  ];
};

export default sitemap;
