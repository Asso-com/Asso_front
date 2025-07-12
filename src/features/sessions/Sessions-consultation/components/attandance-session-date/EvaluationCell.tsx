import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const EvaluationCell = ({ value }: { value: number | null }) => {
  if (!value)
    return (
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Text fontSize="sm" color="gray.400">
          N/A
        </Text>
      </Flex>
    );

  const starRating = value / 5;
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const getColor = (score: number) => {
    if (score >= 20) return "green";
    if (score >= 15) return "blue";
    if (score >= 10) return "orange";
    return "red";
  };

  const color = getColor(value);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-${i}`}
          as={FaStar}
          boxSize="16px"
          color={`${color}.500`}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="half"
          as={FaStarHalfAlt}
          boxSize="16px"
          color={`${color}.500`}
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          as={FaRegStar}
          boxSize="16px"
          color="gray.300"
        />
      );
    }

    return stars;
  };

  return (
    <Flex
      height="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={1}
    >
      <HStack spacing={1}>{renderStars()}</HStack>
    </Flex>
  );
};
export default EvaluationCell;
