export const defaultTheme = {
  styles: {
    global: {
      "html, body": {
        fontFamily: "Noto Sans !important",
      },
    },
  },
  initialColorMode: "light",
  colors: {
    brand: {
      50: "#def3ff",
      100: "#bcdef2",
      200: "#98cbe5",
      300: "#71b9d8",
      400: "#4ca9cc",
      500: "#3394b3",
      600: "#246c8c",
      700: "#144865",
      800: "#02263f",
      900: "#000b1a",
      secondary: "#edc63a",
    },
  },
  fonts: {
    body: "Noto Sans, sans-serif",
    heading: "Noto Sans !important",
  },
  textStyles: {
    font: "Noto Sans, sans-serif",
    title: {
      fontFamily: "Noto Sans",
      fontWeight: 700,
    },
    paragraph: () => ({
      color: "black",
      fontFamily: "Noto Sans",
      fontWeight: 400,
    }),
  },
  layerStyles: {
    base: {
      color: "brand.500",
    },
    primaryButton: {
      backgroundColor: "brand.500",
      color: "white",
    },
    primaryButtonHover: {
      backgroundColor: "white",
      border: "1px",
      borderColor: "brand.500",
      color: "brand.500",
      transform: "scale(1.01)",
    },
  },
};
