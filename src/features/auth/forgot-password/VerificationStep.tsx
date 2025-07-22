import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  VStack,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import AuthButton from "../Button";
import { useTranslation } from "react-i18next";

interface VerificationStepProps {
  pin: string;
  setPin: (pin: string) => void;
  isLoading: boolean;
  handlePinSubmit: (e: React.FormEvent) => void;
  maskedPhone: string;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  pin,
  setPin,
  isLoading,
  handlePinSubmit,
  maskedPhone,
}) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
    useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <Box as="form" onSubmit={handlePinSubmit} width="100%">
      <VStack spacing={6}>
        <VStack spacing={3} textAlign="center">
          <Text fontSize="sm" color="gray.600">
            {t("We've sent a verification code to your phone number ending in")}{" "}
            <Text as="span" fontWeight="600" color="gray.800">
              {maskedPhone}
            </Text>
          </Text>
<HStack spacing={2}>
  <Text fontSize="xs" color="gray.500">
    {t("Enter the 6-digit code below")}
  </Text>
  {timeLeft > 0 && (
    <Text fontSize="xs" color="gray.500" fontWeight="500">
      ({formatTime(timeLeft)})
    </Text>
  )}
</HStack>

        </VStack>
        <FormControl>
          <HStack justify="center">
            <PinInput value={pin} onChange={setPin} size="md" placeholder="0">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </FormControl>
        <VStack spacing={3} width="100%">
          <AuthButton
            type="submit"
            width="100%"
            isLoading={isLoading}
            loadingText={t("Verifying...")}
            bg="brand.500"
            color="white"
            title="Verify Code"
          />
          
          <Text fontSize="xs" color="gray.500" textAlign="center">
            {t("Didn't receive the code?")}{" "}
            <Button variant="link" size="sm" color="brand.500">
              {t("Resend Code")}
            </Button>
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default VerificationStep;