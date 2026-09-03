import type { MetadataRoute } from "next";

// 検索エンジンにインデックスされないようにする(生徒・保護者だけが使うアプリのため)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
