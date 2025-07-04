import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Card,
  CardBody,
  Avatar,
  useColorModeValue,
  Flex,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { FiUser, FiMail, FiBook, FiGlobe } from "react-icons/fi";
import type { EnrolledSubject, StudentData } from "../types";
import { useTranslation } from "react-i18next";
import type { FC } from "react";

const getLevelColor = (levelCode: string) => {
  const colors: Record<string, string> = {
    A1: "green",
    A2: "blue",
    B1: "orange",
    B2: "purple",
    C1: "red",
    C2: "pink",
  };
  return colors[levelCode] || "gray";
};

interface StudentCardProps {
  studentData: StudentData;
}

const StudentCard: FC<StudentCardProps> = ({ studentData }) => {
  const { t } = useTranslation();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Card
      key={studentData.student.id}
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      shadow="xl"
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        shadow: "2xl",
        transform: "translateY(-4px)",
        borderColor: accentColor,
        bg: useColorModeValue("white", "gray.750"),
      }}
      position="relative"
    >
      <Box
        h="16"
        bgGradient={`linear(45deg, ${accentColor}, blue.600, purple.500)`}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(255,255,255,0.1)"
          backdropFilter="blur(10px)"
        />
        <Box position="absolute" top="2" right="2" zIndex={2}>
          <Badge
            colorScheme="whiteAlpha"
            variant="solid"
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            {studentData.enrolledSubjects.length} {t("subjects")}
          </Badge>
        </Box>
      </Box>

      <CardBody p={6} pt={0}>
        <Flex justify="space-between" align="flex-start" mb={6} mt={-8}>
          <Box position="relative">
            <Avatar
              name={`${studentData.student.firstName} ${studentData.student.lastName}`}
              size="xl"
              bg="white"
              color={accentColor}
              border="4px solid"
              borderColor="white"
              shadow="xl"
              fontSize="xl"
              fontWeight="bold"
            />
            <Box
              position="absolute"
              bottom="0"
              right="0"
              w="6"
              h="6"
              bg="green.400"
              borderRadius="full"
              border="2px solid white"
            />
          </Box>
        </Flex>
        <VStack align="start" spacing={4}>
          <Box>
            <Text fontWeight="bold" color={headingColor} fontSize="xl" mb={1}>
              {studentData.student.firstName} {studentData.student.lastName}
            </Text>
            <HStack spacing={2}>
              <Tag
                size="sm"
                colorScheme="blue"
                variant="subtle"
                borderRadius="full"
              >
                <TagLeftIcon as={FiUser} />
                <TagLabel>{studentData.student.registrationId}</TagLabel>
              </Tag>
            </HStack>
          </Box>
          <HStack spacing={3} w="full">
            <Box
              p={2}
              bg={useColorModeValue("blue.50", "blue.900")}
              borderRadius="lg"
              color={accentColor}
            >
              <FiMail size={16} />
            </Box>
            <Text fontSize="sm" color={textColor} flex="1" isTruncated>
              {studentData.student.email}
            </Text>
          </HStack>

          <Box w="full">
            <Flex justify="space-between" align="center" mb={3}>
              <HStack>
                <Box
                  p={2}
                  bg={useColorModeValue("green.50", "green.900")}
                  borderRadius="lg"
                  color="green.500"
                >
                  <FiBook size={16} />
                </Box>
                <Text fontWeight="semibold" color={headingColor}>
                  {t("Registered Subjects")}
                </Text>
              </HStack>
            </Flex>

            <Wrap spacing={2} mb={3}>
              {studentData.enrolledSubjects
                .slice(0, 3)
                .map((subject: EnrolledSubject) => (
                  <WrapItem key={subject.id}>
                    <Tag
                      colorScheme={getLevelColor(subject.level.code)}
                      variant="subtle"
                      size="md"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      <TagLeftIcon as={FiGlobe} />
                      <TagLabel>
                        {subject.subject.name} · {subject.level.code}
                      </TagLabel>
                    </Tag>
                  </WrapItem>
                ))}
              {studentData.enrolledSubjects.length > 3 && (
                <WrapItem>
                  <Tag
                    variant="outline"
                    size="md"
                    borderRadius="full"
                    px={3}
                    py={1}
                    borderColor={borderColor}
                  >
                    <TagLabel>
                      +{studentData.enrolledSubjects.length - 3} {t("others")}
                    </TagLabel>
                  </Tag>
                </WrapItem>
              )}
            </Wrap>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default StudentCard;
