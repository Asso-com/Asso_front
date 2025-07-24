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
import { FiUser, FiMail, FiBook, FiGlobe} from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import type { EnrolledSubject, StudentEnrollmentDetails } from "../../not-academic-enrollments/types";
import { useTranslation } from "react-i18next";
import type { FC } from "react";
import GenericIconButtonWithTooltip from "@components/shared/icons-buttons/GenericIconButtonWithTooltip";
import EditStudentEnrollment from "./sidebar/editStudentEnrollement";
import GenericModal from "@components/ui/GenericModal";


const getLevelColor = (levelCode: string) => {
  const colors: Record<string, string> = {
    A1: "green",
    A2: "blue",
    B1: "orange",
    B2: "purple",
    C1: "red",
    C2: "pink",
    "PRE-A1":"yellow",
  };
  return colors[levelCode] || "gray";
};

interface StudentCardProps {
  studentData: StudentEnrollmentDetails;
}

const StudentCard: FC<StudentCardProps> = ({ studentData }) => {
  const { t } = useTranslation();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isSubjectsModalOpen, setIsSubjectsModalOpen] = useState<boolean>(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleViewAllSubjects = () => {
    setIsSubjectsModalOpen(true);
  };

  const handleCloseSubjectsModal = () => {
    setIsSubjectsModalOpen(false);
  };

  return (
    <>
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
          <Flex
            position="absolute"
            top="2"
            left="2"
            right="2"
            zIndex={2}
            justify="flex-end"
            align="center"
          >
            <Badge
              colorScheme="whiteAlpha"
              variant="solid"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
            >
              {studentData.levelSubjects.length} {t("subjects")}
            </Badge>
            <GenericIconButtonWithTooltip
              icon={<MdEdit size={22} />}
              label={t("Edit Enrollment")}
              ariaLabel="edit_enrollment_btn"
              variant="ghost"
              colorScheme="green"
              size="sm"
              onClick={openEditModal}
            />
          </Flex>
        </Box>

        <CardBody p={3} pt={0}>
          <Flex justify="space-between" align="center" mb={3} mt={-8} w="full">
            <Box position="relative" display="flex" alignItems="center" gap={2}>
              <Avatar
                name={`${studentData.student.firstName} ${studentData.student.lastName}`}
                size="lg"
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
              <Text fontWeight="bold" color={headingColor} fontSize="md" mb={1}>
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

              <Wrap spacing={2} mb={2}>
                {studentData.levelSubjects
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
                {studentData.levelSubjects.length > 3 && (
                  <WrapItem>
                    <Tag
                      variant="outline"
                      size="md"
                      borderRadius="full"
                      px={3}
                      py={1}
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={handleViewAllSubjects}
                      _hover={{
                        borderColor: accentColor,
                        color: accentColor,
                      }}
                    >
                      <TagLabel>
                        +{studentData.levelSubjects.length - 3} {t("others")}
                      </TagLabel>
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            </Box>
          </VStack>
        </CardBody>
        
        <EditStudentEnrollment 
          studentDetails={studentData} 
          isOpen={isEditOpen}
          onClose={closeEditModal}
        />
      </Card>

      <GenericModal
        isOpen={isSubjectsModalOpen}
        onClose={handleCloseSubjectsModal}
        title={t("All Subjects")}
        size="md"
        closeOnOverlayClick={false}
      >
        <Wrap
          spacing={3}
          p={2}
          maxHeight="400px"
          overflowY="auto"
          justify="flex-start"
        >
          {studentData.levelSubjects.map((subject: EnrolledSubject) => (
            <WrapItem key={subject.id}>
              <Tag
                colorScheme={getLevelColor(subject.level.code)}
                variant="subtle"
                size="lg"
                borderRadius="lg"
                whiteSpace="nowrap"
              >
                <TagLeftIcon as={FiGlobe} />
                <TagLabel fontSize="md">
                  {subject.subject.name} · {subject.level.code}
                </TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </GenericModal>
    </>
  );
};

export default StudentCard;