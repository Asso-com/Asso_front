import React from "react";
import { Button, Flex } from "@chakra-ui/react";

interface NavigationButtonsProps {
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  currentStep: number;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  onNext,
  onPrevious,
  onSubmit,
  isLastStep,
}) => {
  return (
    <Flex
      w="full"
      justify={currentStep === 0 ? "flex-end" : "space-between"}
      mt={1}
      flex={1}
    >
      {currentStep > 0 && (
        <Button
          variant="outline"
          borderColor="gray.300"
          color="gray.600"
          size="md"
          borderRadius="full"
          px={8}
          onClick={onPrevious}
          type="button" // Explicitly set to button
        >
          Previous
        </Button>
      )}
      <Button
        bg="linear-gradient(135deg, #4299E1 0%, #2B6CB0 100%)"
        color="white"
        size="md"
        borderRadius="full"
        px={8}
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "lg",
        }}
        type="button" 
        onClick={isLastStep ? onSubmit : onNext}
      >
        {isLastStep ? "Create Session" : "Next"}
      </Button>
    </Flex>
  );
};