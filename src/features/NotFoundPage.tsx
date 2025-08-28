// pages/NotFoundPage.tsx
import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue,
  Container,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";

import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);

const NotFoundPage: React.FC = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50, pink.50)",
    "linear(to-br, gray.900, purple.900, blue.900)"
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("purple.500", "purple.300");

  // const floatVariants = {
  //   animate: {
  //     y: [0, -10, 0],
  //     transition: {
  //       duration: 3,
  //       repeat: Infinity,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // const bounceVariants = {
  //   animate: {
  //     y: [0, -30, 0],
  //     transition: {
  //       duration: 2,
  //       repeat: Infinity,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // const fadeInUpVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 30,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient={bgGradient}
      p={4}
    >
      <Container maxW="2xl" textAlign="center">
        <MotionVStack
          spacing={8}
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <MotionBox
            //variants={floatVariants}
            animate="animate"
            position="relative"
          >
            <MotionText
              fontSize={{ base: "8xl", md: "12xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, purple.400, pink.400, blue.400)"
              bgClip="text"
              lineHeight="1"
              textShadow="0 0 40px rgba(99, 68, 127, 0.3)"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 1, ease: "easeOut" },
              }}
            >
              404
            </MotionText>

            {[...Array(6)].map((_, i) => (
              <MotionBox
                key={i}
                position="absolute"
                w="4px"
                h="4px"
                bg={accentColor}
                borderRadius="full"
                top={`${20 + i * 15}%`}
                left={`${10 + i * 15}%`}
              //  variants={bounceVariants}
                animate="animate"
                style={{
                  animationDelay: `${i * 0.3}s`,
                }}
                opacity={0.6}
                initial={{ scale: 0 }}
                whileInView={{
                  scale: 1,
                  transition: { delay: i * 0.1, duration: 0.5 },
                }}
              />
            ))}
          </MotionBox>

          <MotionBox
            bg={cardBg}
            p={8}
            borderRadius="2xl"
            boxShadow="2xl"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
        //    variants={fadeInUpVariants}
            maxW="lg"
            w="full"
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <VStack spacing={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Heading
                  as="h1"
                  size="xl"
                  color={headingColor}
                  fontWeight="bold"
                >
                  Oops! Page Not Found
                </Heading>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Text
                  fontSize="lg"
                  color={textColor}
                  maxW="md"
                  lineHeight="tall"
                >
                  The page you're looking for seems to have wandered off into
                  the digital wilderness. Don't worry, it happens to the best of
                  us!
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                style={{ width: "100%", maxWidth: "384px" }}
              >
                <VStack spacing={4} w="full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ width: "100%" }}
                  >
                    <Button
                      as={RouterLink}
                      to="/"
                      size="lg"
                      colorScheme="secondary"
                      variant="solid"
                      leftIcon={<Icon as={FiHome} />}
                      w="full"
                    >
                      Back to Dashboard
                    </Button>
                  </motion.div>
                </VStack>
              </motion.div>
            </VStack>
          </MotionBox>
        </MotionVStack>
      </Container>
    </Flex>
  );
};

export default NotFoundPage;
