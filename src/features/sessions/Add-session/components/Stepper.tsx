// components/Stepper.tsx
import React from "react";
import {
  Card,
  CardBody,
  VStack,
  Text,
  Icon,
  Circle,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { InfoIcon, CheckIcon } from "@chakra-ui/icons";
import { FaCalendar } from "react-icons/fa";
interface StepperProps {
  currentStep: number;
}

interface SessionStep {
  title: string;
  description: string;
  icon: React.ElementType;
}

const SESSION_STEPS: SessionStep[] = [
  { title: "Basic Info", description: "Complete session details", icon: InfoIcon },
  { title: "Schedule", description: "Set up schedule", icon: FaCalendar },
  { title: "Select Students", description: "Select students", icon: CheckIcon },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Card
      bg={cardBg}
      shadow="sm"
      borderRadius="xl"
      w={{ base: "20%", md: "200px" }}
      h="100%"
      position={{ base: "static", md: "sticky" }}
      top="6"
      display="flex"
      flexDirection="column"
    >
      <CardBody p={4} flex="1" display="flex" justifyContent="center">
        <VStack pt={8}>
          {SESSION_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index <= currentStep;

            return (
              <React.Fragment key={index}>
                <VStack spacing={1} w="full">
                  <Circle
                    size="40px"
                    bg={isActive ? "blue.400" : "gray.200"}
                    color="white"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    <Icon as={StepIcon} boxSize={4} />
                  </Circle>
                  <Text
                    fontSize="lg"
                    fontWeight={index === currentStep ? "bold" : "medium"}
                    color={isActive ? "blue.400" : "gray.500"}
                    textAlign="center"
                  >
                    {step.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    {step.description}
                  </Text>
                </VStack>
                {index < SESSION_STEPS.length - 1 && (
                  <Box
                    width="2px"
                    height="40px"
                    bg={index < currentStep ? "blue.400" : "gray.200"}
                  />
                )}
              </React.Fragment>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default Stepper;