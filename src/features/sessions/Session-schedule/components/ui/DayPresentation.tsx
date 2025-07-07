import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  Text,
  AccordionItem,
  AccordionPanel,
  Card,
  CardHeader,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import ModernSessionCard from "./ModernSessionCard";
import { dayNames, daysOfWeek } from "../../sessionUtils";
import type { SessionSchuduleDate } from "../../types";
import { useTranslation } from "react-i18next";

interface DayPresentationProps {
  sessionsByDay: Record<string, SessionSchuduleDate[]>;
  subjectColors: Record<string, string>;
}

const DayPresentation: React.FC<DayPresentationProps> = ({
  sessionsByDay,
  subjectColors,
}) => {
  const { t } = useTranslation();
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Accordion allowMultiple defaultIndex={[0, 1, 2, 3, 4, 5, 6]}>
      {daysOfWeek.map((day) => (
        <AccordionItem key={day} border="none" mb={2}>
          <Card
            bg={cardBgColor}
            shadow="lg"
            borderRadius="xl"
            border="1px"
            borderColor={borderColor}
          >
            <AccordionButton _hover={{ bg: "transparent" }}>
              <CardHeader flex="1" textAlign="left">
                <Flex justify="space-between" align="center" w="full">
                  <HStack align="start" alignItems={"center"} spacing={4}>
                    <Heading size="md" color="gray.800">
                      {dayNames[day] || day}
                    </Heading>
                    <Text color="gray.600">
                      {sessionsByDay[day]?.length || 0} session
                      {sessionsByDay[day]?.length !== 1 ? "s" : ""}
                    </Text>
                  </HStack>
                  <HStack>
                    <Progress
                      value={sessionsByDay[day]?.length > 0 ? 100 : 0}
                      size="sm"
                      colorScheme="blue"
                      w="50px"
                      borderRadius="full"
                    />
                    <AccordionIcon color={accentColor} />
                  </HStack>
                </Flex>
              </CardHeader>
            </AccordionButton>
            <AccordionPanel pb={4}>
              {sessionsByDay[day]?.length > 0 ? (
                <SimpleGrid columns={{ base: 1, lg: 2, xl: 4 }} spacing={6}>
                  {sessionsByDay[day].map((session) => (
                    <ModernSessionCard
                      key={session.sessionDateId}
                      session={session}
                      subjectColors={subjectColors}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <Center py={12}>
                  <VStack spacing={4}>
                    <Icon as={FiCalendar} boxSize={12} color="gray.300" />
                    <Text color="gray.500" fontSize="lg">
                      {t("No session scheduled")}
                    </Text>
                  </VStack>
                </Center>
              )}
            </AccordionPanel>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default DayPresentation;
