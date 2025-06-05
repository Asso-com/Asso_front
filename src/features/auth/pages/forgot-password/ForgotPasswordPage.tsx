
import logoApp from "../../../../assets/logo/logo_app.png";
import { useTranslation } from "react-i18next";
import { Box, useColorModeValue, Image, Heading, Link } from "@chakra-ui/react";

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const headingColor = useColorModeValue("gray.700", "gray.100");

  return (
    <Box
      flex="1"
      minWidth={{ base: "100%", md: "400px" }}
      height="100%"
      overflowY="auto"
      boxShadow={{ base: "none", md: "xl" }}
      borderRadius={{ base: "none", md: "md" }}
      display="flex"
      flexDirection="column"
    >
      <Box
        p={{ base: "6", md: "8" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={logoApp} maxH="200px" alt="App Logo" objectFit="cover" />
      </Box>

      <Box height="100%" bg="#fffff" p={{ base: "6", md: "8" }}>
        <Heading
          mb="5"
          as="h2"
          size="md"
          textAlign="center"
          color={headingColor}
          fontWeight="medium"
        >
          {t("Reset Your Password")}
        </Heading>

        <Link
          href="/login"
          color="blue.500"
          fontSize="sm"
          textAlign="center"
          display="block"
          mb="4"
        >
          {t("Go Back")}
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
