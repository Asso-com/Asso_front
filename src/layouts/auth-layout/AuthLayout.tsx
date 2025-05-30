import { Box, Flex } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

import background_login from "../../assets/images/login_backgroud.png";

import { useSelector } from "react-redux";
import { type RootState } from "../../store";

const AuthLayout = () => {
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.authSlice.isUserLoggedIn
  );

  if (isUserLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Flex height="100vh" flexDirection={{ base: "column", md: "row" }}>
      <Box
        backgroundImage={`url(${background_login})`}
        backgroundSize="cover"
        backgroundPosition="center"
        height={{ base: "40%", md: "100%" }}
        width={{ base: "100%", md: "70%" }}
        flexDirection="column"
        justifyContent="center"
        color="white"
        alignItems="start"
        px={{ base: "4", md: "8" }}
        py={{ base: "6", md: "12" }}
        display={{ base: "none", md: "flex" }}
      ></Box>

      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
