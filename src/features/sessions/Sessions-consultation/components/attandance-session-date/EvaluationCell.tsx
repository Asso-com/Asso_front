import { Flex, HStack, Icon } from "@chakra-ui/react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const EvaluationCell = ({ value = 0 }: { value: number }) => {

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const getColor = (score: number) => {
    if (score >= 4.5) return "green";
    if (score >= 3.5) return "blue";
    if (score >= 2.5) return "orange";
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
