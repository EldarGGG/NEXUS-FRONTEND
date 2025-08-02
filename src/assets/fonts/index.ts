import localFont from "next/font/local";

export const font = localFont({
  src: [
    {
      path: "./Gilroy-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Gilroy-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Gilroy-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Gilroy-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
