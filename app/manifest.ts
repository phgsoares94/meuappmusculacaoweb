import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meus Treinos ABCD",
    short_name: "Treinos ABCD",
    description: "PWA de treino de musculação com os treinos A, B, C e D.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F7",
    theme_color: "#ac1a1a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
