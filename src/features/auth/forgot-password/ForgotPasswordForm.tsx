import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Collapse,
} from "@chakra-ui/react";
import { Mail, ArrowLeft } from "lucide-react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <VStack spacing={6} textAlign="center">
        <Alert status="success" borderRadius="12px">
          <AlertIcon />
          Password reset instructions have been sent to your email!
        </Alert>

        <Text color="gray.600" fontSize="sm">
          Check your email inbox for further instructions. Don't forget to check
          your spam folder.
        </Text>

        <Button
          leftIcon={<ArrowLeft size={18} />}
          variant="outline"
          onClick={onBackToLogin}
          size="lg"
          width="100%"
        >
          Back to Login
        </Button>
      </VStack>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={6}>
        <VStack spacing={2} textAlign="center">
          <Text fontSize="sm" color="gray.600">
            Enter your email address and we'll send you instructions to reset
            your password.
          </Text>
        </VStack>

        <Collapse in={!!error} animateOpacity>
          <Alert status="error" borderRadius="12px">
            <AlertIcon />
            {error}
          </Alert>
        </Collapse>

        <FormControl>
          <FormLabel color="gray.700" fontWeight="600">
            Email Address
          </FormLabel>
          <InputGroup>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@school.edu"
              size="lg"
              pl={12}
            />
            <InputRightElement height="48px" pointerEvents="none">
              <Mail size={20} color="#718096" />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <VStack spacing={4} width="100%">
          <Button
            type="submit"
            size="lg"
            width="100%"
            isLoading={isLoading}
            loadingText="Sending..."
            bg="brand.500"
            color="white"
            _hover={{
              bg: "brand.600",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            _active={{
              bg: "brand.700",
              transform: "translateY(0px)",
            }}
          >
            Send Reset Instructions
          </Button>

          <Button
            leftIcon={<ArrowLeft size={18} />}
            variant="outline"
            onClick={onBackToLogin}
            size="md"
            width="100%"
          >
            Back to Login
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ForgotPasswordForm;
