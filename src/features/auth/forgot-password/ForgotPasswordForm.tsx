import React from "react";
import {
  Box,
  VStack,
  Text,
  Progress,
  Divider,
  Collapse,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useForgotPassword } from "./useForgotPassword";
import EmailStep from "./EmailStep";
import VerificationStep from "./VerificationStep";
import PasswordResetStep from "./PasswordResetStep";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const {
    currentStep,
    pin,
    setPin,
    isLoading,
    error,
    successMessage, 
    maskedPhone,
    handleEmailSubmit,
    handlePinSubmit,
    handlePasswordReset,
    getStepProgress,
    getStepTitle,
  } = useForgotPassword(onBackToLogin);

  return (
    <Box width="100%">
      <VStack spacing={4}>
        <Box width="100%">
          <Text
            fontSize="md"
            fontWeight="600"
            color="gray.800"
            textAlign="center"
            mb={2}
          >
            {getStepTitle()}
          </Text>
          <Progress
            value={getStepProgress()}
            colorScheme="blue"
            size="sm"
            borderRadius="full"
            bg="gray.100"
          />
          <Text fontSize="xs" color="gray.500" textAlign="center" mt={1}>
            Step{" "}
            {currentStep === "email"
              ? 1
              : currentStep === "verification"
              ? 2
              : 3}{" "}
            of 3
          </Text>
        </Box>
        <Divider />

        <Collapse in={!!error} animateOpacity>
          <Alert status="error" borderRadius="12px">
            <AlertIcon />
            {error}
          </Alert>
        </Collapse>

        {currentStep === "email" && (
          <EmailStep
            isLoading={isLoading}
            handleEmailSubmit={handleEmailSubmit}
            successMessage={successMessage} // Pass successMessage
          />
        )}
        
        {currentStep === "verification" && (
          <VerificationStep
            pin={pin}
            setPin={setPin}
            isLoading={isLoading}
            handlePinSubmit={handlePinSubmit}
            maskedPhone={maskedPhone}
          />
        )}
        
        {currentStep === "reset" && (
          <PasswordResetStep
            isLoading={isLoading}
            handlePasswordReset={handlePasswordReset}
          />
        )}
        
        <Button
          leftIcon={<ArrowLeft size={18} />}
          variant="outline"
          onClick={onBackToLogin}
          width="100%"
          mt={4}
        >
          Back to Login
        </Button>
      </VStack>
    </Box>
  );
};

export default ForgotPasswordForm;