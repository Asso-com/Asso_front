import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "./theme";

const ChakraUiProvider = ({ children }: React.PropsWithChildren) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraUiProvider;
