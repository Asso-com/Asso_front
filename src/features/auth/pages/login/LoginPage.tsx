// import  { useEffect, useState } from "react";
import { Box, Heading, Image, Link, useColorModeValue } from "@chakra-ui/react"

import logoApp from "../../../../assets/logo/logo_app.png"

import { useTranslation } from "react-i18next"
import LoginForm from "./LoginForm"

const LoginPage = () => {
  const { t } = useTranslation()
  const headingColor = useColorModeValue("gray.700", "gray.100")

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
          {t("Please Login To Your Account")}
        </Heading>
        <LoginForm />
        <Link
          href="/auth/forgot-password"
          color="blue.500"
          fontSize="sm"
          textAlign="center"
          display="block"
          mb="4"
        >
          {t("Forgot Password?")}
        </Link>
      </Box>
    </Box>
  )
}

export default LoginPage
