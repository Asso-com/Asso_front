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
  Badge,
  Divider,
} from "@chakra-ui/react";
import { FiImage, FiTag } from "react-icons/fi";
import type { EventResponse } from "../../types/event.types"; 
import { useTranslation } from "react-i18next";

interface PosterDetailsProps {
  details: EventResponse;
}
const PosterDetails: React.FC<PosterDetailsProps> = ({ details }) => {
  const { t } = useTranslation();
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const iconColor = useColorModeValue("gray.400", "gray.500");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  if (!details) {
    return (
      <Box textAlign="center" py={8}>
        <Text color={textColor}>{t("No event data available")}</Text>
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
  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'TASK':
        return 'blue';
      case 'PUBLIC':
        return 'green';
      case 'SESSION':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const ImageFallback = () => (
    <Center
      width="300px"
      height="400px"
      bg={bgColor}
      border="2px dashed"
      borderColor={borderColor}
      borderRadius="lg"
      flexDirection="column"
      gap={4}
      mx="auto"
    >
      <Icon
        as={FiImage}
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
          {t("No Poster Available")}
        </Text>
        <Text
          fontSize="xs"
          color={iconColor}
          textAlign="center"
          px={4}
        >
          {details.title}
        </Text>
      </VStack>
    </Center>
  );

  const LoadingPlaceholder = () => (
    <Center
      width="300px"
      height="400px"
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
    <Box p={6}>
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8}>
        <GridItem>
          <Box textAlign="center">
            {imageLoading && <LoadingPlaceholder />}
            
            {!imageError && details.eventPoster && (
              <Image
                src={details.eventPoster}
                alt={details.title}
                width="100%"
                maxW="300px"
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
            
            {(imageError || !details.eventPoster) && !imageLoading && <ImageFallback />}
          </Box>
        </GridItem>

        <GridItem>
          <VStack align="stretch" spacing={6}>
            {/* Event Title */}
            <Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={textColor}
                mb={2}
              >
                {details.title}
              </Text>
              <Badge
                colorScheme={getEventTypeColor(details.eventType)}
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
              >
                <Icon as={FiTag} mr={1} />
                {details.eventType}
              </Badge>
            </Box>

            <Divider />

            

              {/* Description */}
              <Box>
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color={labelColor}
                  mb={3}
                >
                  {t("Description")}
                </Text>
                <Text
                  color={textColor}
                  lineHeight="1.6"
                  fontSize="sm"
                  textAlign="justify"
                  bg={bgColor}
                  p={4}
                  borderRadius="md"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  {details.description || t("No description available for this event.")}
                </Text>
              </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PosterDetails;