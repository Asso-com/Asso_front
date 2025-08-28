import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import baseTheme from "./theme";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ChakraUiProvider = ({ children }: React.PropsWithChildren) => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(baseTheme);

  useEffect(() => {
    const updateDirection = (lng: string) => {
      const direction = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.dir = direction;

      setTheme(
        extendTheme({
          ...baseTheme,
          direction,
          styles: {
            global: {
              body: {
                direction,
                fontFamily:
                  direction === "rtl"
                    ? "'Poppins', sans-serif"
                    : "'Poppins', sans-serif",
              },
            },
          },
        })
      );
    };

    updateDirection(i18n.language);

    i18n.on("languageChanged", updateDirection);

    return () => {
      i18n.off("languageChanged", updateDirection);
    };
  }, [i18n]);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraUiProvider;
