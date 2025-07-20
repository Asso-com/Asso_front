import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import LoginForm from "./login/LoginForm";
import ForgotPasswordForm from "./forgot-password/ForgotPasswordForm";

const MotionBox = motion(Box);
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const textColor = useColorModeValue("white", "white");
  const formBg = "rgba(255, 255, 255, 0.95)";
  const formTextColor = "gray.800";

  return (
    <Box minHeight="100vh" position="relative" overflow="hidden">
      <AnimatedBackground isLogin={isLogin} />

      <Container maxW="6xl" centerContent minHeight="100vh" px={8}>
        <Flex
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          width="100%"
        >
          <Flex
            width="100%"
            maxW="1200px"
            alignItems="center"
            justifyContent="space-between"
            direction={{ base: "column", lg: "row" }}
            gap={8}
          >
            <MotionBox
              flex="1"
              textAlign={{ base: "center", lg: "left" }}
              color={textColor}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              display={{ base: "none", lg: "flex" }}
            >
              <VStack
                spacing={6}
                alignItems={{ base: "center", lg: "flex-start" }}
              >
                <MotionBox
                  animate={{ rotate: isLogin ? 0 : 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Box
                    bg="rgba(255, 255, 255, 0.2)"
                    p={6}
                    borderRadius="24px"
                    color="white"
                    display="inline-block"
                    backdropFilter="blur(10px)"
                    border="2px solid rgba(255, 255, 255, 0.3)"
                  >
                    <GraduationCap size={48} />
                  </Box>
                </MotionBox>

                <VStack
                  zIndex={1}
                  spacing={4}
                  alignItems={{ base: "center", lg: "flex-start" }}
                >
                  <Heading
                    size="2xl"
                    color="white"
                    fontWeight="700"
                    textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                  >
                    Asso.comm
                  </Heading>
                  <Text
                    fontSize="xl"
                    color="rgba(255, 255, 255, 0.9)"
                    textShadow="1px 1px 2px rgba(0,0,0,0.3)"
                    maxW="400px"
                  >
                    Empowering Education Through Technology
                  </Text>
                  <Text
                    fontSize="md"
                    color="rgba(255, 255, 255, 0.8)"
                    textShadow="1px 1px 2px rgba(0,0,0,0.3)"
                    maxW="400px"
                  >
                    Connect, Learn, and Grow in our Digital Learning Environment
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>

            <MotionBox
              flex="1"
              maxW="450px"
              width="100%"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                bg={formBg}
                backdropFilter="blur(20px)"
                borderRadius="24px"
                p={8}
                boxShadow="0 25px 50px rgba(0, 0, 0, 0.25)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                position="relative"
                overflow="hidden"
              >
                <VStack spacing={4} mb={4}>
                  <VStack spacing={2} textAlign="center">
                    <AnimatePresence>
                      <MotionBox
                        key={isLogin ? "login" : "forgot"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heading size="lg" color={formTextColor}>
                          {isLogin ? "Welcome Back" : "Reset Password"}
                        </Heading>
                        <Text color="gray.600" fontSize="sm">
                          {isLogin
                            ? "Sign in to access your student portal"
                            : "We'll help you get back to learning"}
                        </Text>
                      </MotionBox>
                    </AnimatePresence>
                  </VStack>
                </VStack>

                <Box width="100%">
                  <AnimatePresence>
                    {isLogin ? (
                      <MotionBox
                        key="login-form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        width="100%"
                      >
                        <LoginForm onForgotPassword={() => setIsLogin(false)} />
                      </MotionBox>
                    ) : (
                      <MotionBox
                        key="forgot-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        width="100%"
                      >
                        <ForgotPasswordForm
                          onBackToLogin={() => setIsLogin(true)}
                        />
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </Box>

                <Box
                  textAlign="center"
                  pt={6}
                  mt={6}
                  borderTop="1px solid rgba(0,0,0,0.1)"
                >
                  <Text fontSize="sm" color="gray.500">
                    Need help? Contact{" "}
                    <Text as="span" color="brand.500" fontWeight="600">
                      support@asso.comm.fr
                    </Text>
                  </Text>
                </Box>
              </Box>
            </MotionBox>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default AuthPage;
