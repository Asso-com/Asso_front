import React, { useState } from "react";
import {
  Box,
  VStack,
  Image,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  Icon,
  Center,
} from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import type { Book } from "@features/Library/types";
import { useTranslation } from "react-i18next";

interface BookDetailsProps {
  book: Book | undefined;
}

const BooksDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const { t } = useTranslation();
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("gray.400", "gray.500");
  
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const isbn = book?.isbnNo?.toString().replace(/[-\s]/g, "");
  const imageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  if (!book) {
    return (
      <Box textAlign="center" py={8}>
        <Text color={textColor}>{t("No book data available")}</Text>
      </Box>
    );
  }

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const ImageFallback = () => (
    <Center
      width="250px"
      height="350px"
      bg={bgColor}
      border="2px dashed"
      borderColor={borderColor}
      borderRadius="lg"
      flexDirection="column"
      gap={4}
      mx="auto"
    >
      <Icon
        as={FiBook}
        boxSize={16}
        color={iconColor}
      />
      <VStack spacing={2}>
        <Text
          fontSize="sm"
          color={textColor}
          fontWeight="medium"
          textAlign="center"
        >
          {t("No Cover Available")}
        </Text>
        <Text
          fontSize="xs"
          color={iconColor}
          textAlign="center"
          px={4}
        >
          {book.bookTitle}
        </Text>
      </VStack>
    </Center>
  );

  const LoadingPlaceholder = () => (
    <Center
      width="250px"
      height="350px"
      bg={bgColor}
      borderRadius="lg"
      mx="auto"
    >
      <VStack spacing={3}>
        <Box
          width="12"
          height="12"
          borderRadius="full"
          bg="gray.300"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="0"
            left="-100%"
            width="100%"
            height="100%"
            bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
            animation="shimmer 1.5s infinite"
            sx={{
              '@keyframes shimmer': {
                '0%': { left: '-100%' },
                '100%': { left: '100%' }
              }
            }}
          />
        </Box>
        <Text fontSize="sm" color={iconColor}>
          {t("Loading...")}
        </Text>
      </VStack>
    </Center>
  );

  return (
    <Box p={4}>
      <Grid templateColumns={{ base: "1fr", md: "250px 1fr" }} gap={6}>
        <GridItem>
          <Box textAlign="center">
            {imageLoading && <LoadingPlaceholder />}
            
            {!imageError && isbn && (
              <Image
                src={imageUrl}
                alt={book.bookTitle}
                width="100%"
                maxW="250px"
                height="auto"
                objectFit="cover"
                borderRadius="lg"
                shadow="lg"
                mx="auto"
                onLoad={handleImageLoad}
                onError={handleImageError}
                display={imageLoading ? "none" : "block"}
              />
            )}
            
            {(imageError || !isbn) && !imageLoading && <ImageFallback />}
          </Box>
        </GridItem>

        <GridItem>
          <VStack align="stretch" spacing={4}>
            <Box>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color={textColor}
                mb={2}
              >
                {t("Description")}
              </Text>
              <Text
                color={textColor}
                lineHeight="1.6"
                fontSize="md"
                textAlign="justify"
              >
                {book.description ||
                  book.bookTitle ||
                  t("No description available for this book.")}
              </Text>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BooksDetails;